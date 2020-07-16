/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import {useStaticQuery, graphql, Link} from "gatsby"
import Header from "./header"
import 'antd/dist/antd.css'
import "./SiteLayout.css"
import {Layout, Menu} from "antd";
const { Sider, Content } = Layout;


const SiteLayout = ({ children, selectedMenuItem = 'main'}) => {
  const data = useStaticQuery(graphql`
    query Asm {
      site {
        siteMetadata {
          title
        }
      }
      hasura {
        car_brands {
          slug
          brand_name
        }
      }
    }
  `);

  /*  return (
      <>
        <Header siteTitle={data.site.siteMetadata.title} />
        <div
          style={{
            margin: `0 auto`,
            maxWidth: 960,
            padding: `0 1.0875rem 1.45rem`,
          }}
        >
          <main>{children}</main>
          <footer>
            © {new Date().getFullYear()}, Built with
            {` `}
            <a href="https://www.gatsbyjs.org">Gatsby</a>
          </footer>
        </div>
      </>
    )
  };*/

  return (
    <>
      <Header siteTitle={data.site.siteMetadata.title}/>
      <main className={'main-container'}>
        <Layout>
          <Sider theme={'light'}>
            <Menu mode="inline" selectedKeys={selectedMenuItem}>
              <Menu.Item key={'main'}>
                <Link to={'/'}>
                  Главная страница
                </Link>
              </Menu.Item>
              {
                data.hasura.car_brands.map((carBrand) => (
                  <Menu.Item key={carBrand.slug} style={{
                      'display': 'flex',
                      'flexDirection': 'column',
                    }}>
                    <Link to={'/'+carBrand.slug}>
                      {carBrand.brand_name}
                    </Link>
                  </Menu.Item>
                ))
              }

            </Menu>
          </Sider>

          <Layout className="site-layout">
            <Content
              style={{
                margin: '24px 16px',
                padding: 24,
                minHeight: 280,
              }}
            >
              {children}
            </Content>
          </Layout>
        </Layout>
      </main>

      <footer>
        © {new Date().getFullYear()}, Built with
        {` `}
        <a href="https://www.gatsbyjs.org">Gatsby</a>
      </footer>
    </>
  );
}


SiteLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default SiteLayout;
