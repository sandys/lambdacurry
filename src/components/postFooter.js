import React from 'react'
import { graphql, navigate, useStaticQuery } from 'gatsby'
import './global.css'

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
    }
  `);

    const sTitle = data.site.siteMetadata.title
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
            <h1 onClick={() => navigate('/about')} 
                className="list-head2" 
                style={{
                    fontSize: '14px', 
                    fontWeight: 600, 
                    letterSpacing: '-1px', 
                    cursor: 'pointer', 
                    marginLeft: '10px'
                }}
            >
                About
            </h1>
      </div>
    )
};

export default PostFooter
