{
  /* <RadioGroup>
  <div className="grid grid-cols-3 gap-4">
    <Card isPressable>
      <CardBody>
        <div className="flex justify-between">
          <VisaIcon />
          <Radio value="visa" />
        </div>
      </CardBody>
    </Card>
    <Card isPressable>
      <CardBody>
        <div className="flex justify-between">
          <MasterIcon />
          <Radio value="master" />
        </div>
      </CardBody>
    </Card>
    <Card isPressable>
      <CardBody>
        <div className="flex justify-between">
          <PaypalIcon />
          <Radio value="paypal" />
        </div>
      </CardBody>
    </Card>
  </div>
</RadioGroup>; */
}

{
  /* <InputField
              isRequired
              control={control}
              label="Card number"
              name="cardNo"
              placeholder="Card number"
              startContent={<CreditCard size={16} />}
            />
            <div className="flex gap-4">
              <InputField
                isRequired
                control={control}
                label="Expiration date (MM / YY)"
                name="expiryDate"
                placeholder="Enter expiry date"
              />
              <InputField
                isRequired
                control={control}
                label="CVC"
                name="cvc"
                placeholder="Enter cvc"
              />
            </div>
            <InputField
              isRequired
              control={control}
              label="Cardholder name"
              name="cardholder"
              placeholder="Cardholder name"
            /> */
}

{
  /* <React.Fragment>
            <div className="bg-white rounded-lg px-4 py-8 col-span-2">
              <form onSubmit={handleSubmit(submitForm)}>
                <CheckoutForm />
                <div className="flex flex-col gap-4">
                  <span className="text-foreground-500">
                    Shipping Information
                  </span>
                  <div className="flex gap-4">
                    <SelectField
                      key="country"
                      isRequired
                      control={control}
                      label="Country"
                      name="address.country"
                      options={allowedCountries}
                      placeholder="Select country"
                    />
                  </div>
                  <InputField
                    isRequired
                    control={control}
                    label="Email address"
                    name="email"
                    placeholder="Enter your email"
                  />
                  <div className="flex gap-4">
                    <InputField
                      isRequired
                      control={control}
                      label="First name"
                      name="firstName"
                      placeholder="Enter your first name"
                    />
                    <InputField
                      isRequired
                      control={control}
                      label="Last name"
                      name="lastName"
                      placeholder="Enter your last name"
                    />
                  </div>
                  <InputField
                    isRequired
                    control={control}
                    label="Address"
                    name="address.line1"
                    placeholder="Lane 1,Street 1"
                  />
                  <InputField
                    control={control}
                    label="Apt, suite, etc."
                    name="address.line2"
                    placeholder="Apartment, studio, or floor"
                  />

                  <div className="flex gap-4">
                    <InputField
                      isRequired
                      control={control}
                      label="City"
                      name="address.city"
                      placeholder="City"
                    />
                    <InputField
                      isRequired
                      control={control}
                      label="State"
                      name="address.state"
                      placeholder="State"
                    />
                    <InputField
                      isRequired
                      control={control}
                      label="Postal code"
                      name="address.postalCode"
                      placeholder="Postal code"
                    />
                  </div>
                  <InputField
                    isRequired
                    control={control}
                    label="Phone number"
                    name="phone"
                    placeholder="+1 (555) 555-5555"
                  />
                  <span className="text-foreground-500">Payment Method</span>
                  {data?.payment?.clientSecret && (
                    <Elements options={options} stripe={stripePromise}>
                      <CheckoutForm />
                    </Elements>
                  )}
                  <span className="text-foreground-500">Billing address</span>
                  <CheckboxField control={control} name="sameAs">
                    Same as shipping address
                  </CheckboxField>
                  <Button
                    fullWidth
                    color="primary"
                    isLoading={isMutating}
                    size="lg"
                    type="submit">
                    {toUpperCase(
                      data?.payment.status === 'Inprogress'
                        ? 'confirm payment'
                        : 'pay now',
                    )}
                  </Button>
                </div>
              </form>
            </div>
            <div className="bg-white  rounded-lg px-4 py-4">
              <h2 className="font-medium text-default-500 border-b-small pb-4">
                Your Order
              </h2>
              <ul>
                {data?.cart?.items.map(({ commodity, quantity }) => (
                  <li
                    key={commodity.id}
                    className="flex items-center gap-4 border-b-small py-4">
                    <Badge color="danger" content={quantity}>
                      <Image
                        className="border px-1"
                        height={80}
                        src={commodity.mainPics[0]}
                        width={80}
                      />
                    </Badge>
                    <div className="flex flex-col flex-1 gap-2">
                      <Link isExternal href="/sd">
                        <h4 className="text-small hover:underline text-foreground-700 line-clamp-2">
                          {commodity.name}
                        </h4>
                      </Link>
                      <span className="text-small font-semibold text-default-700">
                        {formatPrice(commodity.sellingPrice)}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
              {data?.cart && (
                <dl className="flex flex-col gap-4 py-6">
                  <div className="flex justify-between">
                    <dt className="text-small text-default-500">Subtotal</dt>
                    <dd className="text-small font-semibold text-default-700">
                      ${data?.cart.totalAmount}
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-small text-default-500">Delivery</dt>
                    <dd className="text-small font-semibold text-default-700">
                      $0.00
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-small text-default-500">Tax</dt>
                    <dd className="text-small font-semibold text-default-700">
                      $0.00
                    </dd>
                  </div>
                  <Divider />
                  <div className="flex justify-between">
                    <dt className="text-small font-semibold text-default-500">
                      Total
                    </dt>
                    <dd className="text-small font-semibold text-default-700">
                      {formatPrice(data.cart.totalAmount)}
                    </dd>
                  </div>
                </dl>
              )}
            </div>
          </React.Fragment> */
}
