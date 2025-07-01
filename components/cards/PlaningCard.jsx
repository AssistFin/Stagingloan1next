// PlaningCard.jsx
import Image from "next/image";
import Link from "next/link";
import check from "/public/images/icon/check.png";

const PlaningCard = ({ singlePlanning }) => {
  const { icon1, icon2, title, link, dsc_list } = singlePlanning;
  return (
    <div className="plan-box">
      <div className="thumb">
        <Image src={icon1} alt="icon" className="active" />
        <Image src={icon2} alt="icon" className="alt" />
        
      </div>
      <Link href={link || "#"}>
      <h5 style={{ color: "#1E3A8A", fontSize: '20px' }}>{title}</h5>
      </Link>

      <ul className="list">
        {dsc_list?.map((itm, i) => (
          <li key={i} className="list-item d-flex align-items-center">
            {/* <span className="check d-flex align-items-center justify-content-center"> */}
              {/* <Image src={check} alt="icon" /> */}
            {/* </span> */}
            <span>{itm}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PlaningCard;