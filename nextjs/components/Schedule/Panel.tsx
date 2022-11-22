import React, { useState } from 'react'
import useScheduleService from '../../contexts/ScheduleServiceContext';
import formatCurrency from '../../assets/scripts/src/functions/formatCurrency';

const Panel = () => {
    const { selecteds} = useScheduleService();
    const [opened, setOpened] = useState(false);

  return (
    <aside className={opened ? 'open' : ''}>
      <header>Resumo</header>
      <section>
        <table>
          <tbody>
            {selecteds.map(({ name, price, id }) => (
              <tr key={id.toString()}>
                <td>{name}</td>
                <td className="price">{formatCurrency(Number(price))}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      <footer>
        <button
          type="button"
          id="btn-summary-toggle"
          onClick={() => setOpened(!opened)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="7.41"
            viewBox="0 0 12 7.41"
          >
            <path
              d="M10,6,8.59,7.41,13.17,12,8.59,16.59,10,18l6-6Z"
              transform="translate(-6 16) rotate(-90)"
              fill="#707070"
            />
          </svg>
        </button>
        <div>
          <span>Total</span>
          <span className="total">
            {formatCurrency(
              selecteds
                .map((service) => Number(service.price))
                .reduce((previous, current) => previous + current, 0)
            )}
          </span>
        </div>
      </footer>
    </aside>
  )
}

export default Panel