import About from "@/components/About"

export default function page(props: {}) {
  return (

    <section
      id="about"
      className="w-full h-screen bg-gradient-to-b bg-back/50 to-back flex flex-row items-center justify-center"
    >
      <About />
    </section>
  )
}
