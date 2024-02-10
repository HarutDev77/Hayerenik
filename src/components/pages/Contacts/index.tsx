import React from 'react';
import Image from "next/image";
import { FormattedMessage } from 'react-intl';

import ImageHouse from "@/assets/images/contactsPageImage.svg";
import ClaudLeft from "@/assets/images/cloud1.svg";
import classes from "./Contacts.module.scss";


const ContactsPage = () => {
    return (
        <div className={classes.hk_contacts_page}>
            <h1><FormattedMessage id={'contacts'} /></h1>
            <div className={classes.hk_contacts_page_content_box}>
                <div className={classes.hk_contacts_page_content_box_image_box}>
                    <Image
                        src={ImageHouse}
                        alt="Image House"
                        priority={true}
                    />
                    <Image
                        src={ClaudLeft}
                        alt="Image House"
                        priority={true}
                        className={classes.hk_contacts_page_content_box_cloudLeft}
                    />
                    <Image
                        src={ClaudLeft}
                        alt="Image House"
                        priority={true}
                        className={classes.hk_contacts_page_content_box_cloudTop}
                    />
                    <Image
                        src={ClaudLeft}
                        alt="Image House"
                        priority={true}
                        className={classes.hk_contacts_page_content_box_cloudRight}
                    />
                </div>
                <div>
                    <p className={classes.hk_contacts_page_content_box_tell}><a href="tel:+16469804741"></a>+1 646 980 4741</p>
                    <p className={classes.hk_contacts_page_content_box_mail}><a href="mailto:support@hayerenik.com">Support@hayerenik.com</a></p>
                    <p className={classes.hk_contacts_page_content_box_address}><FormattedMessage id={'theAddress'} /></p>
                    <p className={classes.hk_contacts_page_content_box_timeLine}><FormattedMessage id={'workDays'} /></p>
                </div>
            </div>
        </div>
    );
};

export default ContactsPage;