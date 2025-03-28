import { getFooter } from '@/context/server'
import { IconComponent } from '@/features/common/react-icons/IconComponent'

export async function CustomFooter() {
  const { footer } = getFooter()
  return (
    <>
      <div className="footer">
        {/*<img src='./styles/assets/images/svg-shape/blob-1.svg' className=' blob blob-1' />*/}
        {/*    <img src='./styles/assets/images/svg-shape/blob-2.svg'  className='blob blob-2' />*/}
        {/*        <img src='./styles/assets/images/svg-shape/blob-3.svg'  className='blob blob-3' />*/}
        <div className="content">
          {footer.data.attributes.Services.length > 0 && (
            <div className="services">
              <h4>Services</h4>
              {footer.data.attributes.Services.map((service) => (
                <>
                  <p>
                    <a href={service.Url}>{service.Nom}</a>
                  </p>
                </>
              ))}
            </div>
          )}
          {footer.data.attributes.Social.length > 0 && (
            <div className="social-media">
              <h4>Résaux sociaux</h4>
              {footer.data.attributes.Social.map((item) => (
                <>
                  <p>
                    <a href={item.Url}>
                      <IconComponent icon={item.Icone} /> {item.Nom}
                    </a>
                  </p>
                </>
              ))}
            </div>
          )}
          {footer.data.attributes.LiensRapides.length > 0 && (
            <div className="links">
              <h4>Liens rapides</h4>
              {footer.data.attributes.LiensRapides.map((item) => (
                <>
                  <p>
                    <a href={item.Url}>{item.Nom}</a>
                  </p>
                </>
              ))}
            </div>
          )}
          <div className="details">
            {footer.data.attributes.Adresse && (
              <>
                <h4 className="address">Address</h4>
                <p>
                  <a
                    href={
                      'https://www.google.com/maps/place/' +
                      footer.data.attributes.Adresse
                    }
                  >
                    {footer.data.attributes.Adresse}
                  </a>
                </p>
              </>
            )}
            {footer.data.attributes.Telephone && (
              <>
                <h4 className="mobile">Mobile</h4>
                <p>
                  <a href={'tel:' + footer.data.attributes.Telephone}>
                    {footer.data.attributes.Telephone}
                  </a>
                </p>
              </>
            )}
            {footer.data.attributes.Email && (
              <>
                <h4 className="mail">Email</h4>
                <p style={{ fontSize: '.85rem' }}>
                  <a href={'mailto:' + footer.data.attributes.Email}>
                    {footer.data.attributes.Email}
                  </a>
                </p>
              </>
            )}
          </div>
        </div>
        <footer>
          <hr />© 2023 MonBo Réseau.
          <div>
            <small style={{ opacity: 0.7, fontSize: '.75rem' }}>
              Conçu par Alexian Moins et Lucas Lopez.
              {/*Conçu par <a target="_blank" href="https://alexianmoins.be" style={{ color: 'white'}}>Alexian Moins</a> <FaArrowUpRightFromSquare style={{fontSize: '.75rem'}} /> et <a target="_blank" href="https://alexianmoins.be" style={{ color: 'white'}}>Lucas Lopez</a> <FaArrowUpRightFromSquare style={{fontSize: '.75rem'}} />.*/}
            </small>
          </div>
        </footer>
      </div>
    </>
  )
}
