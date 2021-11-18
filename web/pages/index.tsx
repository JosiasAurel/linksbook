import React from "react";

import Header from "../components/Header";
import Footer from "../components/Footer";
import Feature from "../components/Feature";
import Pricing from "../components/Pricing";
import { Button, Badge, Card } from "@geist-ui/react";
import styles from "../styles/index.module.css";

import Head from "next/head";
import Image from "next/image";

const HomePage: React.FC = (): JSX.Element => {
    return (
        <div className={styles.homePage}>
            <Head>
                <title>LinksBook</title>
                <link rel="shortcut icon" href="LinksBook.svg" type="image/x-icon" />
            </Head>
            <Header />

            <div className={styles.main}>
                <main>
                    <h2 style={{ display: "flex", flexDirection: "column", justifyContent: "space-evenly", alignItems: "center", textAlign: "center", fontSize: "180%" }}>
                        <h2 className={styles.copy}>
                            Power up your browsing experience by using linksbook.
                        </h2>
                        <p style={{ color: "gray", fontSize: "0.8em", maxWidth: "80%" }}>
                            Save time and clicks by powering your workflow with linksbook.
                            A clean and feature full app to give you the best bookmarking experience.
                        </p>
                    </h2>
                    <div style={{ margin: "4em", display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <a href="https://app.linksbook.me/auth" target="_blank">
                            <Button scale={1.8} type="success-light" shadow>
                                Get Started
                            </Button>
                        </a>
                    </div>
                    <div className={styles.arrowAndCalltoAction}>
                        <p>Power-up my workflow</p>
                        <svg focusable="false">
                            <path d="M0.600904 7.08166C0.764293 6.8879 1.01492 6.79004 1.26654 6.82177C2.83216 7.01918 5.20326 7.24581 7.54543 7.23964C9.92491 7.23338 12.1351 6.98464 13.4704 6.32142C13.84 6.13785 14.2885 6.28805 14.4722 6.65692C14.6559 7.02578 14.5052 7.47362 14.1356 7.6572C12.4625 8.48822 9.94063 8.72541 7.54852 8.7317C5.67514 8.73663 3.79547 8.5985 2.29921 8.44247C2.80955 9.59638 3.50943 10.6396 4.24665 11.7384C4.39435 11.9585 4.54354 12.1809 4.69301 12.4068C5.79543 14.0733 6.88128 15.8995 7.1179 18.2636C7.15893 18.6735 6.85928 19.0393 6.4486 19.0805C6.03792 19.1217 5.67174 18.8227 5.6307 18.4128C5.43271 16.4346 4.52957 14.868 3.4457 13.2296C3.3058 13.0181 3.16221 12.8046 3.01684 12.5885C2.05899 11.1646 1.02372 9.62564 0.457909 7.78069C0.383671 7.53862 0.437515 7.27541 0.600904 7.08166ZM5.52039 10.2248C5.77662 9.90161 6.24663 9.84687 6.57018 10.1025C16.4834 17.9344 29.9158 22.4064 42.0781 21.4773C54.1988 20.5514 65.0339 14.2748 69.9746 0.584299C70.1145 0.196597 70.5427 -0.0046455 70.931 0.134813C71.3193 0.274276 71.5206 0.70162 71.3807 1.08932C66.2105 15.4159 54.8056 22.0014 42.1913 22.965C29.6185 23.9254 15.8207 19.3142 5.64226 11.2727C5.31871 11.0171 5.26415 10.5479 5.52039 10.2248Z" />
                        </svg>
                    </div>
                </main>
            </div>

            <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                <div className={styles.description}>
                    <p>
                        Linksbook is an app to help you manage all of your browser bookmarks in one place.
                        <br />
                    </p>
                    <p style={{ fontSize: "0.6em", color: "gray" }}>
                        Linksbook aim at providing a better bookmark management experience by serving
                        a customizable environment with a number of useful features.
                    </p>
                </div>
            </div>

            <div id="features" className={styles.featuresContainer}>
                <div className={styles.features}>
                    <Feature
                        title={"Nested Collections"}
                        content="Organize your bookmarks in a way that makes sense to you.
                Linksbook enables you to organise your bookmarks into collections and nest them however you want."
                        icon={"foler.png"}
                        badge="free, wip"
                    />

                    <Feature
                        title={"Reminders"}
                        content="Add reminders to bookmarks so you won't forget to consult them. Send reminders to more than one person."
                        icon={"reminder.png"}
                        badge="pro, wip"
                    />

                    <Feature
                        title={"Tag & Search"}
                        content="Annotate, tag and search. Linksbook allows you to search through your entire set of bookmarks easily via tags and text search."
                        icon={"search.png"}
                        badge="free"
                    />

                    <Feature
                        title={"Drag-n-Drop, Notes"}
                        content="Freely throw bookmarks into various folders via drag-n-drop. Add short notes on bookmarks so you won't have to revisit links evertime."
                        icon={"notebook.png"}
                        badge="free"
                    />

                    <Feature
                        title={"Custom Themes"}
                        content="Dark, Light, Blurred Gradients anc Custom background images. Make your workspace fit your style."
                        icon={"theme.png"}
                        badge="pro, wip"
                    />

                    <Feature
                        title={"Share Collections"}
                        content="Share your carefully created collections with the public easily."
                        icon={"share.png"}
                        badge="pro, wip"
                    />
                </div>
            </div>

            <h1 style={{ textAlign: "center" }}>Get the browser extensions</h1>
            <div className={styles.extensions} id="extensions">
                <Card style={{ textAlign: "center" }}>
                    <Card shadow>
                        <Badge.Anchor>
                            <Badge>
                                Soon
                            </Badge>
                            <Image src="/chrome.png" width="40" height="40" />
                        </Badge.Anchor>
                    </Card>
                    Chrome
                </Card>
                <Card style={{ textAlign: "center" }}>
                    <a target={"_blank"} href="https://addons.mozilla.org/en-GB/firefox/addon/linksbook/">
                        <Card shadow>
                            <Badge.Anchor>
                                <Image src="/firefox.png" width="40" height="40" />
                            </Badge.Anchor>
                        </Card>
                    </a>
                    Firefox
                </Card>
            </div>

            <div style={{ marginTop: "3em" }}>
                <h1 style={{ textAlign: "center" }}>Start free. Upgrade when needed.</h1>
            </div>

            <div id="pricing" className={styles.pricings}>
                <Pricing
                    price={0}
                    features={["Unlimited Bookmarks", "Unlimited Collections", "Tags & Search", "Drag-n-Drop", "Notes"]}
                    callToAction="Sign Up"
                    plantType="Free"
                    selectRedirect="https://app.linksbook.me/auth"
                />
                <Pricing
                    price={30}
                    features={["All in Free plan", "Nested Collections", "Reminders", "Custom Themes", "Share collections"]}
                    callToAction="Buy Now"
                    plantType="Pro"
                    selectRedirect="https://linksbook.gumroad.com/l/idwZX"
                />
                <Pricing
                    price={45}
                    features={["All in Pro plan", "Access to beta stage features", "Request features/changes"]}
                    callToAction="Buy Now"
                    plantType="Pro++"
                    selectRedirect="https://linksbook.gumroad.com/l/idwZX"
                />
            </div>

            <Footer />
        </div >
    )
}

export default HomePage;