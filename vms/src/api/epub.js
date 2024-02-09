// api/epub.js
export default async (req, res) => {
    const { id } = req.query;
  
    try {
      // Here, you would fetch the EPUB content based on the provided ID
      // Since you already fetched the content in the client-side component
      // and passed it to the serverless function through the query parameter,
      // you can access it directly from the query parameter
      const epubContent = req.query.epubContent; // Access the EPUB content from the query parameter
  
      // Send the EPUB content back in the response
      res.status(200).json({ epubFileContent: epubContent });
    } catch (error) {
      console.error('Error fetching EPUB content:', error);
      res.status(500).json({ error: 'Error fetching EPUB content' });
    }
  };
  