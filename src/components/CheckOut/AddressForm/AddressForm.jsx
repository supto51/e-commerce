import React, { useState, useEffect } from "react";
import {
  Button,
  InputLabel,
  Select,
  Typography,
  Grid,
  MenuItem,
  CircularProgress,
} from "@material-ui/core";
import { useForm, FormProvider } from "react-hook-form";
import FormInput from "../FormInput/FormInput";
import { commerce } from "../../../lib/commerce";
import { Link } from "react-router-dom";

const AddressForm = ({ checkOutToken, next, nextStep }) => {
  const methods = useForm();
  const [shippingCountries, setShippingCountries] = useState([]);
  const [shippingCountry, setShippingCountry] = useState("");
  const [shippingSubdivisions, setShippingSubdivisions] = useState([]);
  const [shippingSubdivision, setShippingSubdivision] = useState("");
  const [shippingOptions, setShippingOptions] = useState([]);
  const [shippingOption, setShippingOption] = useState("");

  const countries = Object.entries(shippingCountries).map(([code, name]) => ({
    id: code,
    name: name,
  }));

  const subdivisions = Object.entries(shippingSubdivisions).map(([code, name]) => ({
    id: code,
    name: name,
  }));

  const options = shippingOptions.map((shippingOption) => ({
    id: shippingOption.id,
    name: `${shippingOption.description} - (${shippingOption.price.formatted_with_symbol})`,
  }));

  const fetchShippingCountries = async (checkOutTokenId) => {
    const { countries } = await commerce.services.localeListShippingCountries(checkOutTokenId);

    setShippingCountries(countries);

    setShippingCountry(Object.keys(countries)[0]);
  };

  const fetchShippingSubDivisions = async (checkOutTokenId, countryCode) => {
    const { subdivisions } = await commerce.services.localeListShippingSubdivisions(
      checkOutTokenId,
      countryCode
    );

    setShippingSubdivisions(subdivisions);
    setShippingSubdivision(Object.keys(subdivisions)[0]);
  };

  const fetchShippingOptions = async (checkOutTokenId, country, region = null) => {
    const options = await commerce.checkout.getShippingOptions(checkOutTokenId, {
      country,
      region,
    });

    setShippingOptions(options);
    setShippingOption(options[0].id);
  };

  useEffect(() => {
    fetchShippingCountries(checkOutToken.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (shippingCountry) fetchShippingSubDivisions(checkOutToken.id, shippingCountry);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shippingCountry]);

  useEffect(() => {
    if (shippingSubdivision)
      fetchShippingOptions(checkOutToken.id, shippingCountry, shippingSubdivision);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shippingSubdivision]);

  return (
    <>
      <Typography variant="h5" gutterBottom>
        Shipping Address
      </Typography>
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit((data) =>
            next({ ...data, shippingCountry, shippingSubdivision, shippingOption })
          )}
        >
          {!shippingOption ? (
            <div style={{ textAlign: "center" }}>
              <CircularProgress />
            </div>
          ) : (
            <>
              <Grid container spacing={3}>
                <FormInput name="firstName" label="First Name" required />
                <FormInput name="lastName" label="Last Name" required />
                <FormInput name="address1" label="address" required />
                <FormInput name="email" label="Email" required />
                <FormInput name="city" label="City" required />
                <FormInput name="zip" label="ZIP" required />
                <Grid item xs={12} sm={6}>
                  <InputLabel>Shipping Country</InputLabel>
                  <Select
                    value={shippingCountry}
                    fullWidth
                    onChange={(e) => setShippingCountry(e.target.value)}
                  >
                    {countries.map((country) => (
                      <MenuItem key={country.id} value={country.id}>
                        {country.name}
                      </MenuItem>
                    ))}
                  </Select>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <InputLabel>Shipping Subdivision</InputLabel>
                  <Select
                    fullWidth
                    value={shippingSubdivision}
                    onChange={(e) => setShippingSubdivision(e.target.value)}
                  >
                    {subdivisions.map((subdivision) => (
                      <MenuItem key={subdivision.id} value={subdivision.id}>
                        {subdivision.name}
                      </MenuItem>
                    ))}
                  </Select>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <InputLabel>Shipping Options</InputLabel>
                  <Select
                    value={shippingOption}
                    fullWidth
                    onChange={(e) => setShippingOption(e.target.value)}
                  >
                    {options.map((option) => (
                      <MenuItem key={option.id} value={option.id}>
                        {option.name}
                      </MenuItem>
                    ))}
                  </Select>
                </Grid>
              </Grid>

              <div style={{ display: "flex", justifyContent: "space-between", marginTop: "30px" }}>
                <Button component={Link} to="/cart" variant="outlined" onClick={nextStep}>
                  Back to cart
                </Button>
                <Button variant="contained" color="primary" type="submit">
                  Next
                </Button>
              </div>
            </>
          )}
        </form>
      </FormProvider>
    </>
  );
};

export default AddressForm;
