import type { GetServerSidePropsContext, NextPage } from 'next'
import { Fragment } from 'react'
import Banner from '../components/Home/Banner'
import Contact from '../components/Home/Contact'
import Footer from '../components/Home/Footer'
import Header from '../components/Home/Header'
import Service from '../components/Home/Service'
import { sessionOptions } from '../utils/session'
import { withIronSessionSsr } from 'iron-session/next';

const ComponentPage: NextPage = () => {

  return (
    <Fragment>
      <Header />
      <Banner />
      <Contact />
      <Service />
      <Footer />
    </Fragment>
  )
}

export default ComponentPage

export const getServerSideProps = withIronSessionSsr(async (context: GetServerSidePropsContext) => {

  console.log('TOKEN:', context.req.session.token);

  return {
    props: {
      token: context.req.session.token? context.req.session.token : null
    }
  }

}, sessionOptions)