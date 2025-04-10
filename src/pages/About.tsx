
import Layout from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Users, Lightbulb, Shield, CheckCircle, Award } from "lucide-react";

const About = () => {
  return (
    <Layout>
      <div className="container py-8">
        {/* Hero section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About Cypress</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Empowering communities to identify, report, and resolve local issues together.
          </p>
        </div>
        
        {/* Mission section */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div>
            <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
            <p className="text-lg text-muted-foreground mb-6">
              Cypress was created with a simple but powerful vision: to provide 
              communities with an effective platform to report and track local problems.
            </p>
            <p className="text-lg text-muted-foreground">
              We believe that by making it easier for residents to identify issues and
              for authorities to respond, we can create safer, cleaner, and more
              connected communities.
            </p>
          </div>
          <div className="bg-muted rounded-lg overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
              alt="Team meeting" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        
        {/* Values section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Our Values</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Community First</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We prioritize the needs of communities and focus on solutions 
                  that bring people together to solve common problems.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Trust & Transparency</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We believe in open communication and providing clear, real-time 
                  updates on the status of reported problems.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Lightbulb className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Innovation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We continuously seek better ways to connect citizens with 
                  authorities and improve the problem resolution process.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
        
        {/* How it works section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <MapPin className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Report Problems</h3>
              <p className="text-muted-foreground">
                Identify issues in your community and report them on our interactive map 
                with details and photos.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Award className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Community Support</h3>
              <p className="text-muted-foreground">
                Other users can validate your reports by upvoting and adding 
                comments with additional information.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Track Progress</h3>
              <p className="text-muted-foreground">
                Follow the status of reported problems from pending to in-progress 
                to resolved, with updates along the way.
              </p>
            </div>
          </div>
        </div>
        
        {/* Contact section */}
        <div className="bg-muted rounded-lg p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Get In Touch</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
            Have questions or suggestions about how we can make Cypress better? 
            We'd love to hear from you!
          </p>
          <a 
            href="mailto:info@problemscout.com" 
            className="inline-flex items-center gap-2 text-primary hover:underline"
          >
            <span>info@cypress.com</span>
          </a>
        </div>
      </div>
    </Layout>
  );
};

export default About;
