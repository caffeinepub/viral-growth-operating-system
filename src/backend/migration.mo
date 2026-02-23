module {
  type OldActor = {
    stripeConfig : ?{ secretKey : Text; allowedCountries : [Text] };
  };
  type NewActor = {
    stripeConfig : { secretKey : Text; allowedCountries : [Text] };
  };
  public func run(old : OldActor) : NewActor {
    let defaultConfig : { secretKey : Text; allowedCountries : [Text] } = {
      secretKey = "sk_test_51SqMs35XIYyFCA6UWJR2oA59uinQ364YwSTGN0nD9K6Fuv5skkELENbTdpqlxeKb9m91nHaZf8DgIN2JMpofVpoh004N8ftZJN";
      allowedCountries = [];
    };
    { old with stripeConfig = switch (old.stripeConfig) { case (null) { defaultConfig }; case (?config) { config } } };
  };
};
