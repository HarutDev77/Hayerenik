import React, { FC, useEffect, useState } from 'react';
import classes from './Pagination.module.scss';
import { useRouter } from 'next/router';

const Pagination: FC<{ amount: number; term: string; limit: number; page: number }> = (props) => {
   const [paginationPages, setPaginationPages] = useState<number[]>([]);
   const [paginationPagesAll, setPaginationPagesAll] = useState<number[]>([]);
   const [activePage, setActivePage] = useState<number>(1);
   const { amount, limit } = props;
   const router = useRouter();

   const pagesAmount = Math.ceil(amount / 1);
   const pagesArray = [];

   for (let i = 1; i <= pagesAmount && 1 < amount; i++) {
      pagesArray.push(i);
   }

   const goToPage = async (page) => {
      if (paginationPagesAll.length - page >= 2 && page > 2) {
         setPaginationPages(paginationPagesAll.slice(page - 3, page + 2));
      }
      setActivePage(page);

      await router.push(`/search-result?term=${props.term}&page=${page}&limit=${props.limit}`);
   };

   const firstOrLast = (page) => {
      if (page === 'first') {
         setPaginationPages(paginationPagesAll.slice(0, 5));
         setActivePage(1);
      } else {
         setPaginationPages(
            paginationPagesAll.slice(paginationPagesAll.length - 5, paginationPagesAll.length),
         );
         setActivePage(paginationPagesAll[paginationPagesAll.length - 1]);
      }
   };

   useEffect(() => {
      setActivePage(+props.page);
      setPaginationPagesAll(pagesArray);
      setPaginationPages(pagesArray.slice(0, 5));
      console.log('use effect');
   }, []);

   return paginationPages.length > 1 ? (
      <div className={classes.pagination_cont}>
         {paginationPages[0] !== 1 && (
            <span onClick={() => firstOrLast('first')} className={classes.pagination_first}>
               First ...
            </span>
         )}
         {paginationPages.map((item) => {
            return (
               <span
                  style={activePage === item ? { fontWeight: 'bold', textDecoration: 'none' } : {}}
                  onClick={() => goToPage(item)}
                  key={item}
               >
                  {item}
               </span>
            );
         })}
         {paginationPagesAll[paginationPagesAll?.length - 1] >
            paginationPages[paginationPages.length - 1] && (
            <span onClick={() => firstOrLast('last')} className={classes.pagination_last}>
               ... Last
            </span>
         )}
      </div>
   ) : null;
};

export default Pagination;
