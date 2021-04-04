
const getLinks = async (url) => {
    const res = await fetch(url);
    const links = await res.json();
    return links;
};

export { getLinks };