import React, { FC, useState } from 'react';
import Image from 'next/image';
import Close from '@/assets/images/subClosed.svg';
import Open from '@/assets/images/subOpen.svg';
import { ICategoryData } from '@/types/admin';
import { Category } from '@/types/category';
import classes from './Tree.module.scss';
import { useRouter } from 'next/router';

const Tree: FC<{ node: Category }> = ({ node }) => {
   const [isExpanded, setIsExpanded] = useState(false);
   const router = useRouter();

   const handleToggle = () => {
      setIsExpanded(!isExpanded);
   };
   const goToCategory = (id) => {
      router.push(`/product/list-data/${id}`);
   };

   return (
      <div className={classes.tree_node}>
         <div style={{ display: 'flex', alignItems: 'center' }}>
            <div className={classes.node_toggle}>
               <span className='closeMenu' onClick={() => goToCategory(node.id)}>
                  {node.titleEn}
               </span>
               {node.subCategories.length > 0 ? (
                  isExpanded ? (
                     <Image src={Close} alt={'minus'} priority={true} onClick={handleToggle} />
                  ) : (
                     <Image src={Open} alt={'plus'} priority={true} onClick={handleToggle} />
                  )
               ) : null}
            </div>
         </div>

         {isExpanded && (
            <ul className={classes.child_nodes}>
               {node.subCategories.map((childNode: ICategoryData) => (
                  <li key={childNode.id}>
                     <Tree node={childNode} />
                  </li>
               ))}
            </ul>
         )}
      </div>
   );
};

export default Tree;
