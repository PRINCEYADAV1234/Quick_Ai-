import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Layout from './pages/Layout'
import Home from './pages/Home'
import WriteArticle from './pages/WriteArticle'
import BlogTitles from './pages/BlogTitles'
// import Community from './pages/Community'
import GenerateImages from './pages/GenerateImages'
import RemoveBackground from './pages/RemoveBackground'
import ReviewResume from './pages/ReviewResume'
import RemoveObeject from './pages/RemoveObject'
import { useAuth } from '@clerk/clerk-react'
import { useEffect } from 'react'
import {Toaster} from 'react-hot-toast'


export default function App() {
  return (
    <div>
    <Toaster />
      <Routes>
        <Route path='/' element = {<Home />}/>
        <Route path='/ai' element={<Layout />}>
        <Route index element= {<Dashboard />}/>

        <Route path='write-article' element = {<WriteArticle />}/>
        <Route path='blog-titles' element = {<BlogTitles />}/>

        <Route path='remove-background' element = {<RemoveBackground />}/>
        <Route path='remove-object' element = {<RemoveObeject />}/>

        <Route path='review-resume' element = {<ReviewResume />}/>
        <Route path='generate-image' element = {<GenerateImages />}/>
        {/* <Route path='community' element = {<Community />}/> */}

        </Route>
      </Routes>
    </div>
  )
}
