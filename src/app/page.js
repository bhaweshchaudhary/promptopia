import { Feed } from "@components/Feed";

export default function home() {
  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center">
        Discover & Share
        <br className="lg:hidden" />
        <span className="orange_gradient text-center"> AI-Powered Prompts</span>
      </h1>
      <p className="desc text-center">
        Promptopia is an open-source AI Prompting tool for modern world to discover, create, and share creative prompts
      </p>

      <Feed />
    </section>
  )
}
