import React, { useEffect, useState } from "react";
import styles from "../../styles/dash.module.css";
import LinkCard from "../../components/Link";
import Link from "next/link";

const LinksPage = (props) => {
    const [linkBookId, setLinkBookId] = useState(props.pageProps.id.id);
    const [links, setLinks] = useState([]);

    useEffect(() => {
        console.log(linkBookId)
        fetchLinks()
    })

    function fetchLinks() {
        fetch(`http://https://2zdsf2.deta.dev/getlinks/getlinks/${linkBookId}`)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setLinks(data)
            })
    }
    
   const [label, setLabel] = useState("");
   const [description, setDescription] = useState("");
   const [link, setLink] = useState("");
   const [open, setOpen] = useState(false);

   function handleValuehChange(event, handler) {
        handler(event.target.value);
   }

   function submitNewLink(event) {
       event.preventDefault();
       let newLinkObj = {
           title: label,
           description: description, 
           link: link
       }

       fetch(`http://https://2zdsf2.deta.dev/getlinks/createlink/${linkBookId}`, {
           method: "POST",
           headers: {
               "Content-Type": "application/json"
           },
           body: JSON.stringify(newLinkObj)
       })
        .then(res => res.json())
        .then(data => console.log(data))
   }

   function toggleModal() {
       if (open) {
           setOpen(false)
       } else {
           setOpen(true)
       }
   }
    
    return (
        <div className={styles.linksPage}>
            <header>
                <Link href="/">
                    <h3>LinksBook</h3>
                </Link>
                <h2>Here are your links</h2>
            </header>
            <section className={styles.linksPageLinksContainer}>
                <main className={styles.linksPageLinks}>
                { links.length === 0 ? <h2>You have no links </h2> 
                    :
                    links.map(link => {
                    return (
                        <LinkCard 
                        title={link.title}
                        description={link.description}
                        link={link.link}
                        />
                    )
                })  
            }
            </main>
            </section>

            <div className={styles.createNewLinkContainer}>
                <button onClick={() => toggleModal()}>
                    New Link
                </button>
            </div>

            {open ? 
            <div className={styles.newLinkModal}>
                <form onSubmit={(e) => submitNewLink(e)}>
                    <h2>Create New Link</h2>
                    <input value={label} onChange={(e) => handleValuehChange(e, setLabel)} type="text" placeholder="Label" />
                    <input value={description} onChange={(e) => handleValuehChange(e, setDescription)} type="text" placeholder="Description" />
                    <input value={link} onChange={(e) => handleValuehChange(e, setLink)} type="url" placeholder="Link" />
                    <button type="submit">
                        Create
                    </button>
                </form>
            </div>
            : 
            <div className={styles.newLinkModalClosed}>
                <form>
                    <h2>Create New Link</h2>
                    <input value={label} onChange={(e) => handleValuehChange(e, setLabel)} type="text" placeholder="Label" />
                    <input value={description} onChange={(e) => handleValuehChange(e, setDescription)} type="text" placeholder="Description" />
                    <input value={link} onChange={(e) => handleValuehChange(e, setLink)} type="url" placeholder="Link" />
                    <button type="submit">
                        Create
                    </button>
                </form>
            </div>}
        </div>
    )
}

export async function getServerSideProps(ctx) {
    let linksbookId = ctx.query;
    console.log(linksbookId);
    return {
        props: {
            id: linksbookId
        }
    }
}

export default LinksPage;