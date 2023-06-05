const Navbar = () => {
  return (
    <>
        <nav class="navbar" id="navbar">
        <div class="container">
            <a href="#" class="logo"><img src="https://c.smartrecruiters.com/sr-company-logo-prod-aws-dc5/61d6633f615ce04be5b02331/huge?r=s3-eu-central-1&_1641440424112" alt="Huddle" class="logo" /></a>
            <div class="nav-links">
            <a href="/" class="fill">home</a>
            <a href="/payinser/payin" class="fill">payin</a>
            {/* <a href="#contact" class="fill">contact</a> */}
            <div class="toggle-menu scale-effect">
                <i class="fas fa-times"></i>
            </div>
            </div>
            <div class="toggle-menu scale-effect">
            <i class="fas fa-bars"></i>
            </div>
        </div>
        </nav>
    </>
  );
};

export default Navbar;