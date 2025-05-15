import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import { AccordionItem } from "../Common/Common";

function Icon({ id, open }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className={`${id === open ? "rotate-180" : ""} h-5 w-5 transition-transform`}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
    </svg>
  );
}

const AccordionList = () => {
  const [open, setOpen] = useState(0);

  const handleOpen = (value) => setOpen(open === value ? 0 : value);
  return (
    <>
      <div className="flex flex-col items-center justify-between py-4 px-8">
        {AccordionItem?.map((item) => {
          return (
            <Accordion open={open === item?.id} icon={<Icon id={item?.id} open={open} />}>
              <AccordionHeader onClick={() => handleOpen(item?.id)}>{item?.question}</AccordionHeader>
              <AccordionBody>
                {item?.answer}
              </AccordionBody>
            </Accordion>
          )
        })}
      </div>
    </>
  );
};

export default AccordionList;
