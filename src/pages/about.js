import React, { useState } from 'react'
import Marked from 'marked';
import { navigate } from 'gatsby';
import Layout from "../components/layout"
import '../components/global.css'
import image from '../data/about/images/scenery.jpg'
import Data from '../data/about'
import PostFooter from '../components/postFooter'

export default function About() {
  const [data, setData] = useState(Data)

  return (
      <Layout title="About">
        <article>
            <h1 style={{fontWeight: '500', fontSize: '3rem'}}>About</h1>
            <br />
            <img src={image} alt="avout-pic" />
            <br />
            {data.map((datas) => {
              return (
                <section key={datas.id}>
                  <h3 style={{fontFamily: 'sans-serif'}}> {datas.title ? datas.title : null} </h3>
                  <p style={{fontSize: '14px', fontWeight: 100, letterSpacing: '0.5px', wordSpacing: '2px'}}> {datas.desc} </p>
                </section>
              )
            })}
          <PostFooter />
        </article>
      </Layout>
  )
}
