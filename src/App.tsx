import { h } from 'preact';
import "lazysizes";
// import a plugin
//import "lazysizes/plugins/parent-fit/ls.parent-fit";
const responsiveImage = require("./img/three.jpg?min=320,max=1400,steps=6");


export default () => (
  <main>
    <header>Header</header>

    <article>
      <h3 className="title">A title</h3>
      <div>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vero eaque
        quas ipsa aut laudantium eius, eveniet eligendi ab, veritatis reiciendis
        aperiam architecto. Expedita, ab, maxime voluptatem assumenda
        necessitatibus esse quia nemo magnam alias, dolore ex deserunt.
        Obcaecati, distinctio. Natus, laborum tenetur fugiat totam facilis
        ratione commodi mollitia quasi nesciunt, vel, vitae doloribus. Maxime
        vel, dolorem sit soluta quos accusamus dolores, maiores, nulla animi
        autem doloribus cupiditate eius obcaecati perferendis quibusdam sed
        delectus dicta ab quidem doloremque eveniet repudiandae eos et.
        Dignissimos velit, optio numquam iusto quis deleniti debitis ex modi
        libero autem nulla, atque eveniet doloremque officia consequuntur, eius
        neque!
      </div>

      <img
        sizes="auto"
        src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1880 1140'%3E%3C/svg%3E"
        data-srcset={responsiveImage.srcSet}
        class="lazyload"
      />
    </article>

    <footer>Footer</footer>
  </main>
);
