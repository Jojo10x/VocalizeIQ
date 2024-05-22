import "./Footer.css";

const Footer = () => {
  const currYear = new Date().getFullYear();
  return (
    <div className="copyright">
      <p>
        {currYear} | VocalizeIQ. All Rights Reserved. Built by | 
        <a href="https://joelkasisi.netlify.app/"> Joel Kasisi</a>
      </p>
    </div>
  );
};

export default Footer;