import NewsletterSignup from "../components/NewsLetterSignup";
import PageContent from "../components/PageContent";

function NewsLetterPage() {
  return (
    <PageContent title="Join our awesome newsletter!">
      <NewsletterSignup />
    </PageContent>
  );
}

export default NewsLetterPage;

export async function action({ request }) {
  const data = await request.formData();
  const email = data.get("email");

  console.log(email);
  return { message: "Signup successful!" };
}
