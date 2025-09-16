import React from 'react';
import { 
  FiZap, 
  FiCalendar, 
  FiClock, 
  FiUser, 
  FiMail, 
  FiPhone, 
  FiMapPin, 
  FiFileText, 
  FiCheck,
  FiStar,
  FiShoppingCart,
  FiShoppingBag,
  FiMinus,
  FiPlus,
  FiTrash2,
  FiCreditCard,
  FiMessageSquare,
  FiHeart
} from 'react-icons/fi';

import { 
  FaWhatsapp, 
  FaInstagram, 
  FaTwitter, 
  FaFacebookF 
} from 'react-icons/fa';

// Type-safe wrapper for React Icons
const createIcon = (IconComponent: any) => {
  return React.forwardRef<any, any>((props, ref) => {
    return React.createElement(IconComponent, { ...props, ref });
  });
};

// Feather Icons
export const ZapIcon = createIcon(FiZap);
export const CalendarIcon = createIcon(FiCalendar);
export const ClockIcon = createIcon(FiClock);
export const UserIcon = createIcon(FiUser);
export const MailIcon = createIcon(FiMail);
export const PhoneIcon = createIcon(FiPhone);
export const MapPinIcon = createIcon(FiMapPin);
export const FileTextIcon = createIcon(FiFileText);
export const CheckIcon = createIcon(FiCheck);
export const StarIcon = createIcon(FiStar);
export const ShoppingCartIcon = createIcon(FiShoppingCart);
export const ShoppingBagIcon = createIcon(FiShoppingBag);
export const MinusIcon = createIcon(FiMinus);
export const PlusIcon = createIcon(FiPlus);
export const Trash2Icon = createIcon(FiTrash2);
export const CreditCardIcon = createIcon(FiCreditCard);
export const MessageSquareIcon = createIcon(FiMessageSquare);
export const HeartIcon = createIcon(FiHeart);

// Font Awesome Icons
export const WhatsappIcon = createIcon(FaWhatsapp);
export const InstagramIcon = createIcon(FaInstagram);
export const TwitterIcon = createIcon(FaTwitter);
export const FacebookIcon = createIcon(FaFacebookF);
