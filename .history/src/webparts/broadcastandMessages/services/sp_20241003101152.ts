import { SPFI } from "@pnp/sp";
import { Web } from "@pnp/sp/webs";

export interface FAQListItem {
  Title: string;
  Category: string;
  Author: {
    Title: string;
    ID: string;
    EMail: string;
  };
  Description: string;
}

export const getFAQItems = async (sp: SPFI) => {
  //console.log("context", sp);
  const items: FAQListItem[] = await Web(
    "https://postnord.sharepoint.com/sites/pn-broadcast"
  )
    .lists.getByTitle("NSDTasks")
    .items.select(
      "ID",
      "Title",
      "Category",
      "Author/Title",
      "Author/ID",
      "Author/EMail",
      "Desription"
    )
    .expand("Author")();

  return items;

  //console.log("FAQ items", items);
};