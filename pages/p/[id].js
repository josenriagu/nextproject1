import { useRouter } from 'next/router';
import Markdown from 'react-markdown';
import Layout from '../../components/Layout';
import fetch from 'isomorphic-unfetch';

const Post = props => {
   const router = useRouter();
   const src = props?.show?.image?.medium;
   const title = props?.show?.name;
   const alt = title;
   return (
      <Layout>
         <h1>{router.query.id}</h1>
         <div className="markdown">
            <Markdown
               source={props.show.summary.replace(/<[/]?[pb]>/g, '')}
            />
            <img src={src} alt={alt} title={title} />
         </div>
         <style jsx global>{`
        .markdown {
          font-family: 'Arial';
        }

        .markdown a {
          text-decoration: none;
          color: blue;
        }

        .markdown a:hover {
          opacity: 0.6;
        }

        .markdown h3 {
          margin: 0;
          padding: 0;
          text-transform: uppercase;
        }
        `}</style>
      </Layout>
   );
}

Post.getInitialProps = async function (context) {
   const { id } = context.query;
   const res = await fetch(`https://api.tvmaze.com/shows/${id}`);
   const show = await res.json();

   console.log(`Fetched show: ${show.name}`);

   return { show };
};

export default Post;