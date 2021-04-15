import React from 'react'
import { graphql, navigate, useStaticQuery } from 'gatsby'
import './global.css'
import { capitalizeFirstLetter } from '../utils/capitalizeFirstLetter';

const PostFooter = () => {
    const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          author {
            name
            summary
          }
          social {
            twitter
          }
        }
      }
      allMarkdownRemark{
        edges {
          node {
            excerpt
             fields {
               slug
             }
          }
        }
      }
    }
  `);

    const sTitle = data.site.siteMetadata.title

    const pages = data.allMarkdownRemark.edges.filter(({ node }) => {
      const slug = node.fields.slug
      return slug.split("/")[1] !== "blog";
    });

    return (
        <div className="post-footer">
          <h1 onClick={() => navigate('/')} 
            className="list-head2" 
            style={{
                fontSize: '14px', 
                fontWeight: 600, 
                letterSpacing: '-1px', 
                cursor: 'pointer', 
                marginLeft: '10px'
              }}
          > 
            {sTitle} 
          </h1>
          {pages.map(({node}) => {
              const page = node.fields.slug.split("/")[1]

              return (
                <h1
                  key={page} 
                  onClick={() => navigate(`/${page}`)} 
                  className="list-head2" 
                  style={{
                    fontSize: '14px', 
                    fontWeight: 600, 
                    letterSpacing: '-1px', 
                    cursor: 'pointer', 
                    marginLeft: '10px'
                  }}
                > 
                  {capitalizeFirstLetter(page)} 
                </h1>
              )
            })}
      </div>
    )
};

export default PostFooter
