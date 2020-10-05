import React from "react"
import { graphql } from "gatsby"
import { Link, Typography, Button, Grid, Container } from '@material-ui/core';
import Img from "gatsby-image"
import { RiArrowRightSLine } from "react-icons/ri"
import { createMuiTheme, withStyles, makeStyles } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import Layout from "../components/layout"
import BlogListHome from "../components/blog-list-home"
import SEO from "../components/seo"

export const pageQuery = graphql`
  query HomeQuery($id: String!){
		markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        title
        tagline
        featuredImage {
          childImageSharp {
            fluid(maxWidth: 480, maxHeight: 380, quality: 80, srcSetBreakpoints: [960, 1440]) {
              ...GatsbyImageSharpFluid
            }
            sizes {
              src
            }
          }
        }
        cta {
          ctaText
          ctaLink
        }
      }
    }
  }
`
const font = "'Work Sans', sans-serif";
const theme = createMuiTheme({
  typography: {
    fontFamily: font
  }
});
const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    borderRadius: '1rem',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

const HomePage = ({ data }) => {
  const { markdownRemark } = data // data.markdownRemark holds your post data
  const { frontmatter, html } = markdownRemark
  const classes = useStyles();
  const Image = frontmatter.featuredImage ? frontmatter.featuredImage.childImageSharp.fluid : ""
	return (
    <ThemeProvider theme={theme}>
		<Layout>
      <SEO/>
      <div className="home-banner">
        <div>
          <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
              Pandora's Pack
          </Typography>
          <Typography variant="h5" align="center" color="textSecondary" paragraph>
              Let's do something. Together.  
          </Typography>
          <div className={classes.heroButtons}>
              <Grid container spacing={2} justify="center">
                <Grid item>
                  <Button variant="contained" color="primary">
                    <Link href="/about" color="inherit">
                      Contribute
                    </Link>
                  </Button>
                </Grid>
                <Grid item>
                  <Button variant="contained" color="inherit">
                    <Link href="/contact">
                      Questions?
                    </Link>
                  </Button>
                </Grid>
              </Grid>
          </div>
        </div>
      </div>
      <BlogListHome/>
		</Layout>
    </ThemeProvider>
  )
}

export default HomePage
