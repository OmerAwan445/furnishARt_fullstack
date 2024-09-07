import FurnitureItemsSvs from '@/services/FurnitureItems';
import { AutoCompleteResponse } from '@/types/Types';
import { Button } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { useMutation } from '@tanstack/react-query';
import { debounce } from 'lodash';
import { useRouter } from 'next/navigation';
import { KeyboardEvent, useEffect, useState } from 'react';
import { BiSearch } from 'react-icons/bi';
import DefaultButton from './buttons/DefaultButton';

export default function AutoCompleteSearchbar({ selectedCategoryId }: { selectedCategoryId: number }) {
  const [options, setOptions] = useState<AutoCompleteResponse[]>([]);
  const [inputValue, setInputValue] = useState('');
  const { mutate, isPending } = useMutation({mutationFn: FurnitureItemsSvs.fetchSuggestions});
  const [selectedFurnitureId, setSelectedFurnitureId] = useState<number | null>(null);
  const router = useRouter();
  
  const handleKeyPress = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  const handleSearch = () => {
    if(selectedFurnitureId){
     router.push("/furniture/" + selectedFurnitureId);
    }
  };

  const fetchSuggestions = (query: string) => {
    if (query.trim()) {
      mutate({searchTerm: query.trim(), category_id: selectedCategoryId}, {
        onSuccess: (data) => {
          setOptions((prevOptions) => {
            const newOptions = [...prevOptions];
            data?.forEach((item) => {
              if (!newOptions.some(option => option.name === item.name)) {
                newOptions.push(item);
              }
            });
            return newOptions;
          });
        },
        onError: () => setOptions([]),
      });
    } else {
      setOptions([]);
    }
  };
  
  const debouncedFetchSuggestions = debounce(fetchSuggestions, 500);

  useEffect(() => {
    debouncedFetchSuggestions(inputValue);
    return () => {
      debouncedFetchSuggestions.cancel();
    };
  }, [inputValue]);

  return (
    <>
      <Autocomplete
        freeSolo
        sx={{
          width: 300,
          marginLeft: "0 !important",
          '&::placeholder': {
            opacity: 1,
            color: 'rgba(0, 0, 0, 0.6)',
          },
        }}
        className='!rounded-r-none'
        size='small'
        id="free-solo-2-demo"
        disableClearable
        options={options.length > 0 ? options.map((option) => option.name) : ["No Options"] }
        onInputChange={(event, value) => {
          const selectedOptionId = options.find(option => option.name === value);
          setSelectedFurnitureId(selectedOptionId ? Number(selectedOptionId.id) : null);
          setInputValue(value);
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            sx={{
              '& label': {
                color: 'rgba(0, 0, 0, 0.6)',
              },
              '& label.Mui-focused': {
                color: 'rgba(0, 0, 0, 0.8)',
              },
            }}
            label="Search input"
            onKeyDown={handleKeyPress}
            InputProps={{
              ...params.InputProps,
              type: 'search',
              endAdornment: (
                <>
                  {isPending ? <span>Loading...</span> : null}
                  {params.InputProps.endAdornment}
                </>
              ),
            }}
          />
        )}
      />
      {/* <Button
        variant="contained"
        className='!m-0 !rounded-l-none'
        color="primary"
        size="small"
        onClick={handleSearch}
      > */}
      <DefaultButton  className='!m-0 !rounded-l-none' onClick={handleSearch}>
        <BiSearch />
      </DefaultButton>
      {/* </Button> */}
    </>
  );
}
