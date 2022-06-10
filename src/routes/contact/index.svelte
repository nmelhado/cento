<script>
    import Flourish from "$lib/Flourish.svelte";
</script>

<style>
    .contactContainer {
        width: 100%;
        max-width: 600px;
        padding: 0;
        margin: 0 auto;
    }

    fieldset {
        border: none;
    }

    label {
        display: block;
        font-size: 18px;
        margin: 20px 0 0 0;
    }

    input {
        width: 300px;
        margin-top: 10px;
    }

    textarea {
        width: 100%;
        height: 80px;
        margin: 10px 0 20px 0;
    }

    #bottom {
        margin: 80px 0 0;
    }

    #bottom a {
        color: #666;
        text-decoration: none;
    }
</style>

<div class="contactContainer">
    <h1>Contact</h1>
    
    <p>For more information about our supper clubs, private events, lesons, or catering, please fill out the form below.  We look forward to hearing from you.</p>
    
    <Flourish text="Send us a message" />
    
    <div class="contactForm">
        <fieldset>
            <div class="form-group">
                <label class="col-lg-12 control-label" for="uname">Name:<br>
                    <input type="text" placeholder="Your Name" id="uname" class="form-control" name="theName" value="" required="">
                </label>
            </div>
            <div class="form-group">
                <label class="col-lg-12 control-label" for="uemail">Email:<br>
                    <input type="text" placeholder="Your Email" id="uemail" class="form-control" name="email" value="" required="">
                </label>
            </div>
            <div class="form-group">
                <label class="col-lg-12 control-label" for="umessage">Message:<br>
                    <textarea id="umessage" name="message"></textarea>
                </label>
            </div>

            <div style="height: 10px;clear: both"></div>

            <div class="form-group">
                <div class="col-lg-10">
                <!-- TODO: submit email -->
                <button class="btn btn-primary" type="submit" name="submit">Send Message</button> 
                </div>
            </div>
        </fieldset>
    </div>
    
    <p id="bottom">
        <center>
            Park Slope<br>
            <a href="mailto:info@centopercentobk.com" class="bottomLink">
                info@centopercentobk.com
            </a><br>
            <a href="tel:+12672438760" class="bottomLink">
                (267)243-8760
            </a>
        </center>
    </p>
</div>
