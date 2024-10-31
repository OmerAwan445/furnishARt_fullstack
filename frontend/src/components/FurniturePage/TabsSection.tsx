import { FurnitureItemDetailsProps, TabData } from '@/types/Types';
import { Box } from '@mui/material';
import React from 'react'
import SimpleTabs from '../common/SimpleTabs';
import Reviews from './Reviews';
import FurnitureItemDescription from './FurnitureItemDescription';

const TabsSection = ({ item }: { item: FurnitureItemDetailsProps}) => {
    const tabsData: TabData[] = [
        {
            label: 'Description',
            component: <FurnitureItemDescription item={item}/>
            },
            {
            label: `Reviews(${item.reviews?.length ?? 0})`,
            component: <p><Reviews reviews= {item.reviews} /></p>
        }
    ];

  return (
    <Box component="div" my={4}>
      <SimpleTabs tabs={tabsData} />
    </Box>
  )
}

export default TabsSection
