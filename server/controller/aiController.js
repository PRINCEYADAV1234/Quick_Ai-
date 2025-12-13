import axios from "axios";
import fetch from "node-fetch";
import FormData from "form-data";
import sql from "../configs/db.js";
import { clerkClient } from "@clerk/express";
import fs from "fs";
import { v2 as cloudinary } from "cloudinary";
import { createRequire } from "module";
const require = createRequire(import.meta.url);  // 👈 allows CommonJS import in ESM


export const generateArticle = async (req, res) => {
  try {
    const { userId } = req.auth;
    const { prompt } = req.body;
    const plan = req.plan;
    const free_usage = req.free_usage;

    if (plan !== "premium" && free_usage >= 10) {
      return res.json({
        success: false,
        message: "Limit reached. Upgrade plan to continue",
      });
    }

    console.log("Prompt:", prompt);
    console.log("Key:", process.env.GEMINI_API_KEY);

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
        }),
      }
    );
    const data = await response.json();
    console.log("Gemini Response:", data);

    if (!response.ok || !data?.candidates?.[0]?.content?.parts?.[0]?.text) {
      const errorMsg = data?.error?.message || "Failed to generate article. Please try again.";
      return res.status(response.status || 500).json({
        success: false,
        message: errorMsg,
      });
    }

    const content = data.candidates[0].content.parts[0].text;

    try {
      await sql`
        INSERT INTO creations(user_id, prompt, content, type)
        VALUES(${userId}, ${prompt}, ${content}, 'article')
      `;
    } catch (dbError) {
      console.error("Database Error:", dbError);

    }

    if (plan !== "premium") {
      await clerkClient.users.updateUserMetadata(userId, {
        privateMetadata: {
          free_usage: free_usage + 1,
        },
      });
    }

    res.json({ success: true, content });
  } catch (error) {
    console.error("Error in generateArticle:", error);
    
    // Provide more specific error messages
    let errorMessage = error.message;
    
    if (error.message.includes('fetch failed') || error.message.includes('Error connecting to database')) {
      errorMessage = 'Database connection failed. Please check your DATABASE_URL and network connection.';
    } else if (error.message.includes('DATABASE_URL')) {
      errorMessage = 'Database configuration error. DATABASE_URL is missing or incorrect.';
    }
    
    res.status(500).json({ 
      success: false, 
      message: errorMessage,
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};



export const generateBlogTitle = async (req, res) => {
  try {
    const { userId } = req.auth;
    const { prompt } = req.body;
    const plan = req.plan;
    const free_usage = req.free_usage;

    if (plan !== "premium" && free_usage >= 10) {
      return res.json({
        success: false,
        message: "Limit reached. Upgrade plan to continue",
      });
    }

    console.log("Prompt:", prompt);
    console.log("Key:", process.env.GEMINI_API_KEY);

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
        }),
      }
    );
    const data = await response.json();
    console.log("Gemini Response:", data);

    if (!response.ok || !data?.candidates?.[0]?.content?.parts?.[0]?.text) {
      const errorMsg = data?.error?.message || "Failed to generate article. Please try again.";
      return res.status(response.status || 500).json({
        success: false,
        message: errorMsg,
      });
    }

    const content = data.candidates[0].content.parts[0].text;

    try {
      await sql`
        INSERT INTO creations(user_id, prompt, content, type)
        VALUES(${userId}, ${prompt}, ${content}, 'article')
      `;
    } catch (dbError) {
      console.error("Database Error:", dbError);

    }

    if (plan !== "premium") {
      await clerkClient.users.updateUserMetadata(userId, {
        privateMetadata: {
          free_usage: free_usage + 1,
        },
      });
    }

    res.json({ success: true, content });
  } catch (error) {
    console.error("Error in generateArticle:", error);
    
    // Provide more specific error messages
    let errorMessage = error.message;
    
    if (error.message.includes('fetch failed') || error.message.includes('Error connecting to database')) {
      errorMessage = 'Database connection failed. Please check your DATABASE_URL and network connection.';
    } else if (error.message.includes('DATABASE_URL')) {
      errorMessage = 'Database configuration error. DATABASE_URL is missing or incorrect.';
    }
    res.status(500).json({ 
      success: false, 
      message: errorMessage,
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};





// for the generate image and this feature is only for the premium users
export const generateImage = async (req, res) => {
  try {
    const { userId } = req.auth; // fix: req.auth is an object, not a function
    const { prompt, publish } = req.body;
    const plan = req.plan;

    // validate prompt
    if (!prompt || typeof prompt !== 'string' || prompt.trim() === '') {
      return res.status(400).json({ success: false, message: 'Prompt is required' });
    }

    if (plan !== "premium") {
      return res.status(403).json({
        success: false,
        message: "Available in premium plan",
      });
    }
    if (!process.env.CLIPDROP_API_KEY) {
      return res.status(500).json({
        success: false,
        message: "CLIPDROP_API_KEY is not configured"
      });
    }

    console.log("Image Generation Prompt:", prompt);

    // build multipart form
    const formData = new FormData();
    formData.append('prompt', prompt.trim());

    // include proper multipart headers
    const formHeaders = formData.getHeaders();
    const response = await axios.post("https://clipdrop-api.co/text-to-image/v1", formData, {
      headers: {
        ...formHeaders,
        'x-api-key': process.env.CLIPDROP_API_KEY
      },
      responseType: 'arraybuffer'
    });

    const base64Image = `data:image/png;base64,${Buffer.from(response.data).toString('base64')}`;

    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    const { secure_url } = await cloudinary.uploader.upload(base64Image);

    await sql` 
      INSERT INTO creations(user_id, prompt, content, type, publish)
      VALUES(${userId}, ${prompt}, ${secure_url}, 'image', ${publish ?? false})
    `;

    return res.json({ success: true, content: secure_url });
  } catch (error) {
    console.error("Error in generateImage:", error);
    return res.status(error.response?.status || 500).json({ success: false, message: error.message });
  }
};





// for the Remove background and this feature is only for the premium users
export const removeBackground = async (req, res) => {
  try {
    const { userId } = req.auth;
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'Image file is required' });
    }
    const plan = req.plan;

    if (plan !== "premium") {
      return res.status(403).json({
        success: false,
        message: "Available in premium plan",
      });
    }

    if (!process.env.CLIPDROP_API_KEY) {
      return res.status(500).json({
        success: false,
        message: "CLIPDROP_API_KEY is not configured"
      });
    }

    // Use ClipDrop to remove background
    const form = new FormData();
    form.append('image_file', fs.createReadStream(req.file.path));

    const clipdropResp = await axios.post(
      'https://clipdrop-api.co/remove-background/v1',
      form,
      {
        headers: {
          ...form.getHeaders(),
          'x-api-key': process.env.CLIPDROP_API_KEY,
        },
        responseType: 'arraybuffer'
      }
    );

    // Convert to data URL
    const dataUrl = `data:image/png;base64,${Buffer.from(clipdropResp.data).toString('base64')}`;

    // Try uploading to Cloudinary if configured; otherwise return base64
    let outUrl = dataUrl;
    if (process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_API_SECRET) {
      cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
      });
      const { secure_url } = await cloudinary.uploader.upload(dataUrl);
      outUrl = secure_url;
    }

    await sql` 
      INSERT INTO creations(user_id, prompt, content, type)
      VALUES(${userId}, 'Remove background from image', ${outUrl}, 'image')
    `;

    // Clean up uploaded file
    if (req.file?.path && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }

    return res.json({ success: true, content: outUrl });
  } catch (error) {
    console.error("Error in removeBackground:", error);
    // Clean up uploaded file on error
    if (req.file?.path && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }
    return res.status(error.response?.status || 500).json({ success: false, message: error.message });
  }
};




export const removeImageObject= async (req, res) => {
  try {
    const { userId } = req.auth;
    const {object} = req.body;
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'Image file is required' });
    }
    if (!object || typeof object !== 'string' || object.trim().split(' ').length > 1) {
      return res.status(400).json({ success: false, message: 'Please provide a single object name to remove' });
    }
    const plan = req.plan;

    if (plan !== "premium") {
      return res.status(403).json({
        success: false,
        message: "Available in premium plan",
      });
    }

    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    const uploadRes = await cloudinary.uploader.upload(req.file.path);

    // Generate transformation eagerly to get a stable URL
    const explicitRes = await cloudinary.uploader.explicit(uploadRes.public_id, {
      type: 'upload',
      eager: [ { effect: `gen_remove:${object.trim()}` } ]
    });

    const transformedUrl = explicitRes.eager?.[0]?.secure_url;
    if (!transformedUrl) {
      throw new Error('Failed to generate transformed image');
    }

    const promptText = `Removed ${object} from image`;
    await sql` 
      INSERT INTO creations(user_id, prompt, content, type)
      VALUES(${userId}, ${promptText}, ${transformedUrl}, 'image')
    `;

    // Clean up uploaded file
    if (req.file?.path && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }

    return res.json({ success: true, content: transformedUrl });
  } catch (error) {
    console.error("Error in removeImageObject:", error);
    // Clean up uploaded file on error
    if (req.file?.path && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }
    return res.status(error.response?.status || 500).json({ success: false, message: error.message });
  }
};




export const resumeReview= async (req, res) => {
  try {
    const pdfParse = require("pdf-parse"); 
    const { userId } = req.auth;
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'Resume file is required' });
    }
    const resume = req.file;
    if (!resume.mimetype || !resume.mimetype.includes('pdf')) {
      return res.status(400).json({ success: false, message: 'Only PDF files are supported' });
    }
    const plan = req.plan;

    if (plan !== "premium") {
      return res.status(403).json({
        success: false,
        message: "Available in premium plan",
      });
    }

    if (!process.env.CLIPDROP_API_KEY) {
      return res.status(500).json({
        success: false,
        message: "CLIPDROP_API_KEY is not configured"
      });
    }

  
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    if (resume.size > 5 * 1024 * 1024) {
      return res.status(400).json({
        success: false,
        message: "Resume size should be less than 5MB"
      });
    }

    const dataBuffer = fs.readFileSync(resume.path);
    // let pdfData;
    // try {
    //   // Try parsing up to 10 pages first
    //   pdfData = await pdfParse(dataBuffer, { max: 10 });
    // } catch (e1) {
    //   console.error("PDF parse failed (max:10). Retrying with 2 pages...", e1?.message);
    //   try {
    //     pdfData = await pdfParse(dataBuffer, { max: 2 });
    //   } catch (e2) {
    //     console.error("PDF parse failed (max:2). Retrying with 1 page...", e2?.message);
    //     try {
    //       pdfData = await pdfParse(dataBuffer, { max: 1 });
    //     } catch (e3) {
    //       console.error("PDF parsing error (all attempts):", e3);
    //       if (fs.existsSync(resume.path)) {
    //         fs.unlinkSync(resume.path);
    //       }
    //       return res.status(400).json({
    //         success: false,
    //         message: "Failed to parse PDF. If it's a scanned image or protected PDF, please export as a regular text PDF or upload a different file."
    //       });
    //     }
    //   }
    // }

    // updated part for the pdf parser
    let pdfData;
try {
  pdfData = await pdfParse(dataBuffer, {
    max: 10,
    pagerender: () => ""
  });
} catch (e1) {
  console.error("PDF parse failed (max:10). Retrying with 2 pages...", e1?.message);
  try {
    pdfData = await pdfParse(dataBuffer, {
      max: 2,
      pagerender: () => ""
    });
  } catch (e2) {
    console.error("PDF parse failed (max:2). Retrying with 1 page...", e2?.message);
    try {
      pdfData = await pdfParse(dataBuffer, {
        max: 1,
        pagerender: () => ""
      });
    } catch (e3) {
      console.error("PDF parsing error (all attempts):", e3);
      if (fs.existsSync(resume.path)) fs.unlinkSync(resume.path);
      return res.status(400).json({
        success: false,
        message:
          "Failed to parse PDF. Please upload a text-based (non-scanned) PDF."
      });
    }
  }
}


    const text = (pdfData?.text || "").trim();
    if (!text || text.length < 50) {
      if (fs.existsSync(resume.path)) {
        fs.unlinkSync(resume.path);
      }
      return res.status(400).json({
        success: false,
        message: "Could not extract readable text from the PDF. Please upload a text-based (non-scanned) PDF."
      });
    }

    const prompt = ` Review the following resume and provide a detailed analysis of the candidate's skills, experience, and qualifications and areas to improve. The resume is as follows:\n\n ${text}`;

// paste the gemini ai api here

     const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
        }),
      }
    );
    const data = await response.json();
    console.log("Gemini Response:", data);

    if (!response.ok || !data?.candidates?.[0]?.content?.parts?.[0]?.text) {
      const errorMsg = data?.error?.message || "Failed to review resume. Please try again.";
      return res.status(response.status || 500).json({
        success: false,
        message: errorMsg,
      });
    }

    const content = data.candidates[0].content.parts[0].text;

    await sql` 
      INSERT INTO creations(user_id, prompt, content, type)
      VALUES(${userId}, 'Resume Review', ${content}, 'resume-review')
    `;

    // Clean up uploaded file
    if (resume.path && fs.existsSync(resume.path)) {
      fs.unlinkSync(resume.path);
    }

    return res.json({ success: true, content });
  } catch (error) {
    console.error("Error in resumeReview:", error);
    // Clean up uploaded file on error
    if (req.file?.path && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }
    return res.status(error.response?.status || 500).json({ success: false, message: error.message });
  }
};
