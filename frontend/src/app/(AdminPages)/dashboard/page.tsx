import { Card, Grid, Typography } from "@mui/material";
import Link from "next/link";
import { BsViewList } from "react-icons/bs";
import { FaLaptopMedical } from "react-icons/fa";
import { IoIosLaptop } from "react-icons/io";

const Dashboard = () => {
  return (
    <>
      <Typography variant="h4" className="font-semibold text-text-primary mb-3">
        Dashboard
      </Typography>
      <Typography variant="body1" className="text-text-secondary mb-5">
        Here's an overview of your online business.
      </Typography>

      {/* Summary Cards */}
      {/*  <Grid container spacing={2}>
            {orders && (
              <Grid item xs={12} sm={6} lg={3}>
                <Card className="p-4 bg-background-paper shadow-md hover:shadow-lg transition duration-200">
                  <RiShoppingCart2Line className="text-6xl text-primary-main mb-4" />
                  <Typography variant="h5" className="font-bold">
                    {orders.length} Orders
                  </Typography>
                  <Typography className="text-text-secondary">
                    {orders.length} orders placed
                  </Typography>
                </Card>
              </Grid>
            )}
            {totalRevenue && (
              <Grid item xs={12} sm={6} lg={3}>
                <Card className="p-4 bg-background-paper shadow-md hover:shadow-lg transition duration-200">
                  <BiRupee className="text-6xl text-primary-main mb-4" />
                  <Typography variant="h5" className="font-bold">
                    {totalRevenue
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ',')} Total Revenue
                  </Typography>
                  <Typography className="text-text-secondary">
                    {totalRevenue
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ',')} revenue generated
                  </Typography>
                </Card>
              </Grid>
            )}
            {products && (
              <Grid item xs={12} sm={6} lg={3}>
                <Card className="p-4 bg-background-paper shadow-md hover:shadow-lg transition duration-200">
                  <IoIosLaptop className="text-6xl text-primary-main mb-4" />
                  <Typography variant="h5" className="font-bold">
                    {products.length} Products
                  </Typography>
                  <Typography className="text-text-secondary">
                    {products.length} products added
                  </Typography>
                </Card>
              </Grid>
            )}
            {users && (
              <Grid item xs={12} sm={6} lg={3}>
                <Card className="p-4 bg-background-paper shadow-md hover:shadow-lg transition duration-200">
                  <RiUser3Line className="text-6xl text-primary-main mb-4" />
                  <Typography variant="h5" className="font-bold">
                    {users.length} Customers
                  </Typography>
                  <Typography className="text-text-secondary">
                    {users.length} registered customers
                  </Typography>
                </Card>
              </Grid>
            )}
          </Grid> */}

      {/* Quick Links */}
      <Typography
        variant="h4"
        className="font-semibold text-text-primary mt-8 mb-4"
      >
        Quick Links
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} lg={4}>
          <Card className="p-4 bg-background-paper shadow-md hover:shadow-lg transition duration-200">
            <BsViewList className="text-5xl text-primary-main mb-4" />
            <Typography variant="h5" className="font-bold">
              Product Categories
            </Typography>
            <Typography className="text-text-secondary">
              <Link href="/categories" className="underline text-primary-dark">
                Click here
              </Link>{" "}
              to add, remove or edit categories
            </Typography>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} lg={4}>
          <Card className="p-4 bg-background-paper shadow-md hover:shadow-lg transition duration-200">
            <IoIosLaptop className="text-5xl text-primary-main mb-4" />
            <Typography variant="h5" className="font-bold">
              All Products
            </Typography>
            <Typography className="text-text-secondary">
              <Link href="/products" className="underline text-primary-dark">
                Click here
              </Link>{" "}
              to view, remove or edit products
            </Typography>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} lg={4}>
          <Card className="p-4 bg-background-paper shadow-md hover:shadow-lg transition duration-200">
            <FaLaptopMedical className="text-5xl text-primary-main mb-4" />
            <Typography variant="h5" className="font-bold">
              Add Products
            </Typography>
            <Typography className="text-text-secondary">
              <Link
                href="/products/add"
                className="underline text-primary-dark"
              >
                Click here
              </Link>{" "}
              to add new products
            </Typography>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default Dashboard;
