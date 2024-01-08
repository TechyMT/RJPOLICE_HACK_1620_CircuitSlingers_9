import React from "react";
import Image from "next/image";
import styles from "./Icon.module.css";

import DropdownIcon from "./svg/dropdown.svg";
import Upload from "./svg/upload.svg";
import DashboardIcon from "./svg/dashboard.svg";
import ProfileIcon from "./svg/profile.svg";
import InvoiceIcon from "./svg/invoice.svg";
import CustomerIcon from "./svg/customer.svg";
import TransactionsIcon from "./svg/transactions.svg";
import Pencil from "./svg/pencil.svg";
import Instagram from "./svg/instagram.svg";
import Facebook from "./svg/facebook.svg";
import WhatsApp from "./svg/whatsapp.svg";
import Twitter from "./svg/twitter.svg";
import PlusSquare from "./svg/plus-square.svg";
import Ellipse from "./svg/ellipse.svg";
import Ellipse2 from "./svg/ellipse2.svg";
import Eye from "./svg/eye.svg";
import Link from "./svg/link.svg";
import Vector from "./svg/Vector.svg";
import Search from "./svg/search.svg";
import Bell from "./svg/bell.svg";
import Vector2 from "./svg/loginbg.svg";
import Ellipse3 from "./svg/ellipse3.svg";
import Ellipse4 from "./svg/ellipse4.svg";
import Ellipse5 from "./svg/ellipse5.svg";
import EyeSlash from "./svg/eyeslash.svg";
import Phone from "./svg/phone.svg";
import Mail from "./svg/mail.svg";
import DocumentPlus from "./svg/document-plus.svg";
import News from "./svg/news-white-icon.svg";
import Apply from "./svg/apply-white-icon.svg";
import Location from "./svg/locations-white-icon.svg";
import Report from "./svg/reports-white-icon.svg";
import Outreach from "./svg/outreach-white-icon.svg";
import Quote from "./svg/quote.svg";
import NavRight from "./svg/navright.svg";
import NavLeft from "./svg/navleft.svg";

interface IconProps {
  icon: string;
  className?: string;
  height?: number;
  width?: number;
}

const Icon: React.FC<IconProps> = ({
  icon,
  className,
  height = 20,
  width = 20,
  ...rest
}) => {
  const icons: Record<string, any> = {
    dropdown: DropdownIcon,
    upload: Upload,
    dashboard: DashboardIcon,
    profile: ProfileIcon,
    invoice: InvoiceIcon,
    customer: CustomerIcon,
    transactions: TransactionsIcon,
    pencil: Pencil,
    instagram: Instagram,
    facebook: Facebook,
    twitter: Twitter,
    whatsapp: WhatsApp,
    plussquare: PlusSquare,
    ellipse: Ellipse,
    ellipse2: Ellipse2,
    ellipse3: Ellipse3,
    ellipse4: Ellipse4,
    ellipse5: Ellipse5,
    eye: Eye,
    payment: Link,
    vector: Vector,
    search: Search,
    bell: Bell,
    vector2: Vector2,
    eyeslash: EyeSlash,
    phone: Phone,
    mail: Mail,
    documentplus: DocumentPlus,
    news: News,
    apply: Apply,
    location: Location,
    report: Report,
    outreach: Outreach,
    quote: Quote,
    navright: NavRight,
    navleft: NavLeft,
  };

  const IconComponent = icons[icon];

  return (
    <Image
      src={IconComponent}
      className={`${styles.icon}  ${className}`}
      height={height}
      width={width}
      {...rest}
      alt="icon"
    />
  );
};

export default Icon;
