import { Button } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import * as React from 'react';
import { BiSearch } from 'react-icons/bi';
import { topFilms as suggestions }  from "@/DummyData";


interface Film {
  title: string;
  year: number;
}

function sleep(duration: number): Promise<void> {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, duration);
  });
}

export default function AutoCompleteSearchbar() {
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState<readonly Film[]>([]);
  const loading = open && options.length === 0;

  const handleKeyPress = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  const handleSearch = () => {
    console.log('Search button clicked!');
  };

  React.useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {
      await sleep(1e3); // For demo purposes.

      if (active) {
        setOptions([...suggestions]);
      }
    })();

    return () => {
      active = false;
    };
  }, [loading]);

  React.useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  return (
    <>
      <Autocomplete
        freeSolo
        sx={{  
        width: 300,
        marginLeft: "0 !important",
        '&::placeholder': {
          opacity: 1,
          color: 'rgba(0, 0, 0, 0.6)', // Darker placeholder color
        },
        }}
        className='!rounded-r-none'
        size='small'
        id="free-solo-2-demo"
        disableClearable
        options={suggestions.map((option) => option.title)}
        renderInput={(params) => (
          <TextField
            {...params}
            sx={{
              '& label': {
                color: 'rgba(0, 0, 0, 0.6)', // Darker label color
              },
              '& label.Mui-focused': {
                color: 'rgba(0, 0, 0, 0.8)', // Even darker label color when focused
              },
            }}
            label="Search input"
            onKeyDown= {handleKeyPress}
            InputProps={{
              ...params.InputProps,
              type: 'search',
            }}
            
          />
        )}
      />
      <Button
        variant="contained"
        className='!m-0 !rounded-l-none'
        color="primary"
        sx={{ marginLeft: 0 }}
        size="small"
        onClick={handleSearch}
      >
        <BiSearch />
      </Button>
    </>
  );
}
