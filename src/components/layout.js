import React from "react"
import { Link, navigate } from "gatsby"
import { useStaticQuery, graphql } from "gatsby"
import { ThemeToggler } from "gatsby-plugin-dark-mode"
import { scale } from "../utils/typography"

import Footer from "./footer"
import "./global.css"
import { filteredYears } from "../utils/filteredYears"
import { capitalizeFirstLetter } from '../utils/capitalizeFirstLetter';

const Layout = ({ location, title, children }) => {
  const data = useStaticQuery(graphql`
    query {
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

  const pages = data.allMarkdownRemark.edges.filter(({ node }) => {
    const slug = node.fields.slug
    return slug.split("/")[1] !== "blog";
  });

  const allYears = filteredYears(data.allMarkdownRemark.edges);

  const toggle = (
    <ThemeToggler>
      {({ toggleTheme, theme }) => {
        const isDarkMode = theme === "dark"
        if (theme == null) {
          return null
        }

        return (

          <button
            aria-label="theme-switch"
            className="leading-none p-1"
            onClick={() => toggleTheme(isDarkMode ? "light" : "dark")}
          >
            {isDarkMode ? (
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12.2822 21.9999H12.1819C10.8075 21.9894 9.44895 21.7048 8.18586 21.1628C6.92278 20.6207 5.78054 19.8321 4.82604 18.8431C3.05606 16.9503 2.04993 14.469 2.00181 11.878C1.95369 9.28699 2.867 6.77001 4.56548 4.81279C5.65973 3.58648 7.03535 2.64418 8.57414 2.06686C8.75369 1.99777 8.94933 1.98182 9.1377 2.02091C9.32607 2.06001 9.49921 2.1525 9.63643 2.28733C9.76353 2.41693 9.85303 2.57862 9.89539 2.75513C9.93775 2.93163 9.93138 3.11633 9.87695 3.2895C9.32772 4.79368 9.21891 6.42332 9.56327 7.98717C9.90764 9.55102 10.6909 10.9842 11.8212 12.1186C12.9619 13.2453 14.3985 14.026 15.9646 14.37C17.5307 14.7141 19.1622 14.6076 20.6703 14.0628C20.8498 13.9996 21.0435 13.9888 21.2289 14.0317C21.4143 14.0746 21.5837 14.1694 21.7172 14.305C21.8507 14.4406 21.9428 14.6114 21.9828 14.7975C22.0228 14.9835 22.009 15.1771 21.943 15.3556C21.4311 16.7222 20.6313 17.9629 19.598 18.9934C18.6367 19.9518 17.4956 20.7108 16.2401 21.2267C14.9846 21.7427 13.6395 22.0054 12.2822 21.9999V21.9999Z"></path>
              </svg>
            ) : (
              <svg id="Capa_1" enableBackground="new 0 0 510.482 510.482" height="24" viewBox="0 0 510.482 510.482" width="24" xmlns="http://www.w3.org/2000/svg"><g><path d="m501.058 266.497-2.209-4.436c-6.015-12.076-16.064-21.558-28.422-26.861l-.781-1.793c-3.561-8.167-9.102-15.489-16.023-21.176-3.201-2.627-7.925-2.165-10.557 1.035-2.629 3.201-2.165 7.928 1.035 10.557 5.1 4.188 9.178 9.575 11.795 15.577l2.007 4.604c.795 1.824 2.281 3.258 4.134 3.985l1.26.494c8.507 3.342 15.619 9.335 20.351 17.066h-198.347v-7.805c0-20.058-16.318-36.376-36.376-36.376h-18.288c-8.045 0-14.59-6.545-14.59-14.59s6.545-14.59 14.59-14.59c17.702 0 32.104-14.402 32.104-32.105v-7.958h1.217c7.877 0 15.276 3.853 19.793 10.306 1.403 2.005 3.697 3.199 6.145 3.199h12.711c11.164 0 21.659 4.347 29.552 12.239l3.009 3.01c1.406 1.406 3.314 2.197 5.304 2.197h5.981c11.163 0 21.658 4.348 29.552 12.241l3.915 3.915c1.407 1.406 3.314 2.196 5.304 2.196h9.818c7.918 0 15.653 2.251 22.37 6.508 3.498 2.218 8.132 1.182 10.35-2.318 2.218-3.499 1.18-8.133-2.318-10.351-9.122-5.782-19.635-8.839-30.401-8.839h-6.712l-1.718-1.719c-10.728-10.727-24.989-16.634-40.159-16.634h-2.874l-.813-.813c-10.727-10.726-24.988-16.633-40.159-16.633h-9.063c-7.392-8.521-18.181-13.505-29.586-13.505h-17.434c-2.886 0-5.731.326-8.493.942.154-.817.291-1.64.384-2.475 2.083-18.594-11.35-35.415-29.942-37.497-10.384-1.163-20.473 2.512-27.644 9.631-2.233-1.731-4.66-3.264-7.273-4.551-3.716-1.828-8.212-.301-10.042 3.415s-.301 8.212 3.415 10.042c9.26 4.56 15.012 13.795 15.012 24.102 0 14.806-12.045 26.851-26.851 26.851-14.805 0-26.85-12.045-26.85-26.851 0-9.685 5.256-18.657 13.716-23.416 3.61-2.031 4.891-6.604 2.86-10.214-2.031-3.611-6.605-4.891-10.214-2.86-10.614 5.97-17.981 16.207-20.448 27.851-17.876.939-32.131 15.777-32.131 33.882 0 9.901 4.277 18.81 11.064 25.017-5.959 2.552-11.486 6.126-16.345 10.657-16.126 4.774-29.163 16.28-35.907 31.754l-.781 1.792c-12.357 5.304-22.407 14.785-28.422 26.861l-2.21 4.436c-5.496 2.079-9.423 7.38-9.423 13.595v24.219c0 4.661 2.258 9.07 6.039 11.794l22.181 15.982c3.361 2.422 8.047 1.661 10.47-1.7 2.422-3.361 1.66-8.048-1.7-10.47l-21.99-15.845v-23.518h69.437c7.425 0 13.465 6.04 13.465 13.465v22.598c0 14.758 12.006 26.764 26.764 26.764s26.764-12.006 26.764-26.764v-22.598c0-7.425 6.04-13.465 13.465-13.465h330.589v23.518l-83.693 60.302h-25.703c-4.143 0-7.5 3.357-7.5 7.5s3.357 7.5 7.5 7.5h18.24l-4.521 16.175c-.338 1.209-1.45 2.053-2.705 2.053h-283.72c-1.255 0-2.367-.844-2.704-2.052l-4.521-16.176h246.654c4.143 0 7.5-3.357 7.5-7.5s-3.357-7.5-7.5-7.5h-254.119l-35.77-25.772c-3.36-2.42-8.048-1.661-10.47 1.7s-1.66 8.049 1.7 10.47l35.604 25.651 6.475 23.165c2.143 7.662 9.194 13.014 17.15 13.014h283.719c7.956 0 15.008-5.352 17.15-13.015l6.475-23.164 83.716-60.317c3.783-2.725 6.041-7.134 6.041-11.795v-24.219c0-6.215-3.927-11.516-9.424-13.591zm-294.254-153.493c10.374 1.162 17.868 10.547 16.706 20.922-.563 5.024-3.049 9.529-7 12.685-3.952 3.155-8.891 4.579-13.921 4.021-2.267-.254-4.434-.914-6.428-1.926.503-2.581.781-5.242.781-7.968 0-7.903-2.178-15.395-6.099-21.82 4.021-4.33 9.891-6.596 15.961-5.914zm-93.046 34.183c1.854 11.912 8.747 22.164 18.43 28.523-3.344 5.596-9.425 9.2-16.232 9.2-10.438 0-18.931-8.492-18.931-18.931-.001-9.694 7.327-17.698 16.733-18.792zm22.671 146.828v22.598c0 6.486-5.277 11.764-11.764 11.764s-11.764-5.277-11.764-11.764v-22.598c0-15.695-12.77-28.465-28.465-28.465h-57.6c4.732-7.731 11.843-13.724 20.35-17.065l1.261-.496c1.853-.727 3.339-2.16 4.134-3.984l2.007-4.604c5.104-11.708 15.104-20.329 27.433-23.652l.516-.139c1.269-.341 2.426-1.01 3.355-1.938 7.894-7.894 18.388-12.241 29.551-12.241h9.818c1.989 0 3.896-.79 5.304-2.196l3.915-3.915c7.894-7.894 18.389-12.241 29.552-12.241h5.981c1.989 0 3.897-.791 5.304-2.197l3.009-3.009c7.893-7.894 18.388-12.24 29.552-12.24h12.711c2.447 0 4.74-1.194 6.145-3.199 4.517-6.453 11.916-10.306 19.793-10.306h1.217v7.958c0 9.432-7.673 17.105-17.104 17.105-16.315 0-29.59 13.274-29.59 29.59s13.274 29.59 29.59 29.59h18.288c11.787 0 21.376 9.589 21.376 21.376v7.805h-105.41c-15.696-.002-28.465 12.768-28.465 28.463z" /><path d="m169.496 206.049h-18.386c-9.833 0-17.832 7.999-17.832 17.832v8.823c0 9.833 7.999 17.832 17.832 17.832h18.386c9.833 0 17.832-7.999 17.832-17.832v-8.823c0-9.833-7.999-17.832-17.832-17.832zm2.832 26.656c0 1.562-1.271 2.832-2.832 2.832h-18.386c-1.562 0-2.832-1.271-2.832-2.832v-8.823c0-1.562 1.271-2.832 2.832-2.832h18.386c1.562 0 2.832 1.271 2.832 2.832z" /><path d="m98.283 235.537h-7.177c-4.143 0-7.5 3.357-7.5 7.5s3.357 7.5 7.5 7.5h7.177c4.143 0 7.5-3.357 7.5-7.5s-3.357-7.5-7.5-7.5z" /><path d="m327.768 198.582-1.841 1.732c-3.133 2.946-8.031 2.938-11.15-.019l-1.787-1.694c-3.005-2.85-7.752-2.725-10.603.282-2.851 3.006-2.724 7.753.282 10.603l1.788 1.695c4.455 4.222 10.179 6.333 15.905 6.333 5.697 0 11.396-2.092 15.844-6.276l1.841-1.732c3.017-2.839 3.161-7.586.322-10.602-2.841-3.017-7.585-3.158-10.601-.322z" /><path d="m395.008 225.637-1.842 1.732c-3.129 2.946-8.028 2.939-11.149-.019l-1.787-1.694c-3.006-2.851-7.753-2.725-10.603.282-2.851 3.006-2.724 7.753.282 10.603l1.788 1.695c4.455 4.222 10.18 6.334 15.905 6.334 5.698 0 11.397-2.092 15.844-6.277l1.841-1.732c3.017-2.839 3.161-7.586.322-10.602-2.84-3.017-7.585-3.157-10.601-.322z" /></g></svg>
            )}
          </button>
        )
      }}
    </ThemeToggler>
  )

  const header = (
    <>
      {toggle}
      <h2 className="toggle"

        style={{
          ...scale(1),
          fontFamily: `Montserrat, sans-serif`,
        }}
      >
      </h2>
    </>
  )

  return (

    <div
      style={{
        backgroundColor: "var(--bg)",
        color: "var(--textNormal)",
        transition: "color 0.2s ease-out, background 0.2s ease-out",
      }}
    >

      <div className="sidebar">
        <div
        >
          {header}
          <div className="sidediv" >
            <div className="toggle-1">
              <h6 key="home" onClick={() => navigate(`/`)}>{capitalizeFirstLetter("Home")}</h6>
              {pages.map(({ node }) => {
                const page = node.fields.slug.split("/")[1]

                return (
                  <h6 key={page} onClick={() => navigate(`/${page}`)}>{capitalizeFirstLetter(page)}</h6>
                )
              })}

            </div>
            <div className="toggle-2">
              <ul>
                {allYears.map(year => (
                  <li key={year} onClick={() => navigate(`/#${year}`)}>{year}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

      </div>

      <div className="main-content relative">
        <main>{children}</main>
        {/* <Footer /> */}
      </div>
    </div>
  )
};

export default Layout
