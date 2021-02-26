import Layout from "../components/Layout";
import Link from 'next/link'
const Index = () => {
  return (
    <Layout>
      <h2>Index Pages</h2>
      <Link href="/signup">Signup</Link>
      {/* <a href="/signup">Signup</a> */}
    </Layout>
  );
};
export default Index;
