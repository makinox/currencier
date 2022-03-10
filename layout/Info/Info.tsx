import { FluidContainer } from '@makinox/makinox-ui';

export default function Info() {
  return (
    <section className={`flex justify-evenly ${FluidContainer()}`}>
      <article>
        <p>Revisa y compara la informacion de las diferentes monedas</p>
        <div>
          <form>
            <div>
              <select>
                <option>Peso</option>
                <option>Dollar</option>
              </select>
            </div>
            <div>
              <select>
                <option>Dollar</option>
                <option>Peso</option>
              </select>
            </div>
            <div>
              <button>Compare</button>
            </div>
          </form>
        </div>
      </article>
      <article>
        <p>Lee los blogs mas recientes sobre las monedas que te interesan</p>
        <button>Echa un vistazo</button>
      </article>
    </section>
  );
}
