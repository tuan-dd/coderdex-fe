import { SearchOutlined } from "@mui/icons-material";
import { Stack, Container, Grid, Button } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { changePage, searchQuery } from "../features/pokemons/pokemonSlice";
import { pokemonTypes } from "../pokemonTypes";
import { FormProvider, FTextField, FRadioGroup } from "./form";

const styles = {
  container: {
    // padding: '0!important',
    color: "white",
    backgroundColor: "black",
    display: "flex",
    justifyContent: "center",
  },
  center: {
    display: "flex",
    justifyContent: "center",
  },
  inputText: {
    backgroundColor: "white",
    borderRadius: 1,
    color: "white",
    width: "85%",
    "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
      border: "3px solid blue",
      borderRadius: 1,
    },
    "& .MuiOutlinedInput-input": {
      border: "3px solid gray",
      padding: "0.5rem",
      borderRadius: 1,
    },
  },
  icon: {
    backgroundColor: "#ee6b2f",
    height: "2.5rem",
    width: "2.5rem",
    padding: 0.1,
    borderRadius: 1,
  },
  boxRight: {
    padding: 2,
    backgroundColor: "green",
    borderRadius: 2,
    width: { xs: "90%", md: "100%" },
  },
};

export const FILTER_GENDER_OPTIONS = [
  "Name",
  "Type",
  "Type1",
  "Type2",
  "Japanese Name",
];
const defaultValues = {
  q: "",
  select: "Name",
  type: "",
};
export const SearchBox = () => {
  const methods = useForm({ defaultValues });
  const { handleSubmit } = methods;
  const dispatch = useDispatch();
  const onSubmit = (data) => {
    console.log(data);
    dispatch(searchQuery(data));
    dispatch(changePage(1));
  };

  return (
    <Container maxWidth="lg" sx={styles.container}>
      <Grid
        container
        maxWidth="md"
        sx={{ paddingY: "2rem" }}
        spacing={{ xs: 2, md: 4 }}
        columns={{ xs: 12, sm: 12, md: 12 }}
      >
        <Grid item xs={12} sx={styles.center}>
          <Stack sx={{ width: { xs: "90%", md: "100%" } }}>
            <FormProvider methods={methods}>
              <FRadioGroup
                name="select"
                options={FILTER_GENDER_OPTIONS}
                sx={{
                  ".css-hyxlzm": {
                    color: "white",
                  },
                }}
              />
            </FormProvider>
            <FormProvider methods={methods}>
              <FRadioGroup
                name="type"
                options={pokemonTypes}
                sx={{
                  ".css-hyxlzm": {
                    color: "white",
                  },
                }}
              />
            </FormProvider>
            <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
              <Stack direction="row" alignItems="center" spacing={2}>
                <FTextField name="q" sx={styles.inputText} />

                <Button type="submit">
                  <SearchOutlined sx={styles.icon} />
                </Button>
              </Stack>
            </FormProvider>
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
};
