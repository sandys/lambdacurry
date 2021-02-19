import React from "react"
import { useStaticQuery, graphql, navigate } from "gatsby"
import Image from "gatsby-image"
import PostFooter from './postFooter'
import { rhythm } from "../utils/typography";

const Bio = () => {
  const data = useStaticQuery(graphql`
    query BioQuery {
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
  `)

  const { author, social } = data.site.siteMetadata
  const sTitle = data.site.siteMetadata.title
  return (
    <div
      style={{
        marginBottom: rhythm(2.5),
      }}
    >
      <i><p style={{ fontSize: '12px' }}>
        Find me on Twitter
        {` `}
        <a href={`https://twitter.com/${social.twitter}`}>
          @{social.twitter}
        </a>
      </p></i>
      <i><p style={{ fontSize: '12px' }}>
        Did i make any mistake? Please consider
        {` `}
        <a href={`https://twitter.com/${social.twitter}`}>
          sending a pull request.
        </a>
      </p></i>
      <PostFooter />
    </div>
  );
};

export default Bio;
