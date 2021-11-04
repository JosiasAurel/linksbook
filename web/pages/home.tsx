import React from "react";

import Header from "../components/Header";
import Footer from "../components/Footer";
import { Button, Card, Badge } from "@geist-ui/react";

import styles from "../styles/index.module.css";

const HomePage: React.FC = (): JSX.Element => {
    return (
        <div className={styles.homePage}>
            <Header />

            <div className={styles.main}>
                <main>
                    <h2 style={{ textAlign: "center", fontSize: "180%" }}>
                        <h2 style={{ textDecoration: "line-through" }}>Waste time managing bookmarks in the browser.</h2>
                        <br />
                        Power-up your workflow with linksbook.
                    </h2>
                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <Button type="success-light" shadow>
                            Power up my workflow
                        </Button>
                    </div>
                </main>
            </div>

            <div style={{ margin: "2em", display: "flex", justifyContent: "space-evenly", alignItems: "center", flexDirection: "column" }}>
                <div className={styles.featureShower}>
                    <Card shadow>
                        Everything you need in a unified and beautiful and customizable UI
                    </Card>
                    <div>
                        <p>
                            LinksBook UI is made simple and beautiful to ensure best user experience. Enjoy dark mode and custom backgrounds images.
                        </p>
                    </div>
                </div>

                <div className={styles.featureShower}>
                    <Card type="cyan" shadow>
                        Set up reminders so you do not forget to check your saved bookmarks
                    </Card>
                    <div>

                        <p>
                            <Badge>
                                Pro
                            </Badge>
                            <br />
                            Never forget to actually read your links by setting one-time reminders.
                            <br />
                            Get emailed to read your bookmarks.
                        </p>
                    </div>
                </div>

                <div className={styles.featureShower}>
                    <Card type="purple" shadow>
                        Add notes on bookmarks to save you time in the future
                    </Card>
                    <div>
                        <p>
                            Add summary notes about a bookmark content straight into the app.
                        </p>
                    </div>
                </div>

                <div className={styles.featureShower}>
                    <Card shadow>
                        Tag, Search & Nested Collections
                    </Card>
                    <div>
                        <p>
                            <Badge>
                                Pro
                            </Badge>
                            <br />
                            Create complex folder structures, tag your bookmarks and live search for easy navigation.
                        </p>
                    </div>
                </div>

            </div>

            <Footer />
        </div>
    )
}

export default HomePage;