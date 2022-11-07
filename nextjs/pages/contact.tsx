import { withIronSessionSsr } from 'iron-session/next'
import type { GetServerSidePropsContext, NextPage } from 'next'
import { Fragment } from 'react'
import Contact from '../components/Home/Contact'
import Footer from '../components/Home/Footer'
import Header from '../components/Home/Header'
import { sessionOptions } from '../utils/session'

type ComponentPageType = {
    token: string;
}

const ComponentPage: NextPage<ComponentPageType> = ({ token }) => {
    return (
        <Fragment>
            <Header />
            {token}
            <Contact />
            <Footer />
        </Fragment>
    )
}

export default ComponentPage

export const getServerSideProps = withIronSessionSsr(async (context: GetServerSidePropsContext) => {

    return {
        props: {
            token: context.req.session.token
        }
    }

}, sessionOptions)