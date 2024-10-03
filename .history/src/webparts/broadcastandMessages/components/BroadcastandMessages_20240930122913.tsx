import * as React from "react";
import type { IBroadcastandMessagesProps } from "./IBroadcastandMessagesProps";
import { SPFI } from "@pnp/sp";
import { useEffect } from "react";
import { getSP } from "../../../pnpjsConfig";
import { FAQListItem, getFAQItems } from "../services/sp";

//interface IFAQ {
//Title: string;
//Answer: string;
//}

const Faq = (props: IBroadcastandMessagesProps) => {
  // const LOG_SOURCE = "FAQ Webpart";
  // const LIST_NAME = "FAQ";
  let _sp: SPFI = getSP(props.context);

  const [faqItems, setFaqItems] = React.useState<FAQListItem[]>([]);
  console.log(faqItems);
  //makes sure to start this when shit renders
  useEffect(() => {
    getFAQItems(_sp).then((value) => {
      setFaqItems(value);
    });
  }, []);

  return (
    <div className="accordion-container">
      {faqItems.map((faqItem) => {
        return (
          <div className="accordion-tab">
            <div className="accordion-header">
              <span className="accordion-title">{faqItem.Title}</span>
              <span className="accordion-icon">▼</span>
            </div>
            <div className="accordion-content">{faqItem.Body}</div>
          </div>
        );
      })}
    </div>
  );
};

export default Faq;