// Gatsby supports TypeScript natively!
import React from "react";
import { PageProps, Link, graphql, navigate } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import PostFooter from '../components/postFooter'
import { rhythm } from "../utils/typography"
import '../components/global.css'
import { filteredYears } from "../utils/filteredYears";

type PageContext = {
  currentPage: number
  numPages: number
}
type Data = {
  site: {
    siteMetadata: {
      title: string
      description: string
    }
  }
  allMarkdownRemark: {
    edges: {
      node: {
        excerpt: string
        frontmatter: {
          title: string
          date: string
          description: string
          Head: string
        }
        fields: {
          slug: string
        }
      }
    }[]
  }
}

const BlogIndex = ({
  data,
  location,
  pageContext,
}: PageProps<Data>) => {
  const posts = data.allMarkdownRemark.edges;
  const sTitle = data.site.siteMetadata.title;
  
  const allYears = filteredYears(posts);

  return (
    <Layout location={location} title={sTitle}>
      <SEO title="All posts" />
      <h1 className="list-head"> {sTitle}</h1>
      <br />
      <div className="fragments fragments-separator" />
      <br />
      <p style={{ fontSize: '14px', fontWeight: 'bold' }}>{data.site.siteMetadata.description}</p>
      {allYears.map(year => {
        const nodes:any = posts.filter(({node}: any) => year === node.fields.slug.split("-")[0].replace(/\\|\//g,''));
        
        return (
          <>
            <h4 
              id={year} 
              style={{ fontFamily: 'sans-serif', marginBottom: '10px', letterSpacing: '0px' }}
            > 
              {year}
            </h4>
            {nodes.map(({node}) => {
              const title = node.frontmatter.title || node.fields.slug;

              return (
                  <React.Fragment>
                    <article id={node.fields.slug} key={node.fields.slug}>
                      <div>
                        <Link className="blog-links" style={{ boxShadow: `none`, fontWeight: 300, }} to={node.fields.slug}>
                          {title}
                        </Link>
                        <small className="date-blogs" style={{ color: '#b9b7b7', fontFamily: 'sans-serif', fontWeight: 400, textDecoration: 'none' }}><i>{node.frontmatter.date}</i></small>
                      </div>
                    </article>
                  </React.Fragment>
                )
            })}
          </>
        )
      })}
      <PostFooter />
    </Layout>
  )
};

export default BlogIndex

export const pageQuery = graphql`
  query blogPageQuery($skip: Int!) {
    site {
      siteMetadata {
        title
        description
      }
    }
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      skip: $skip
    ) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            Head
          }
        }
      }
    }
  }
`;