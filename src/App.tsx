import { h } from 'preact';
const responsiveImage = require("./img/one.jpg?sizes[]=100,sizes[]=200,sizes[]=300");
const responsiveImage2 = require("./img/two.jpg?sizes[]=100,sizes[]=200,sizes[]=300");

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
      <img srcset={responsiveImage.srcSet} src={responsiveImage.src} />
      <img class="lazy" data-srcset={responsiveImage2.srcSet} data-src={responsiveImage2.src} />
    </article>

    <footer>Footer</footer>
  </main>
);
