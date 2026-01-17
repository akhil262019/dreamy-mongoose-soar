import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// Placeholder component for financial summary
const FinancialSummary: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Financial Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-lg">Current Balance: $10,000.00</p>
        <p className="text-muted-foreground">Income This Month: $5,000.00</p>
        <p className="text-muted-foreground">Expenses This Month: $3,000.00</p>
        <Button className="mt-4">View Details</Button>
      </CardContent>
    </Card>
  );
};

const IndexPage: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Financial Planner Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <FinancialSummary />
        {/* Add more components here as needed */}
      </div>
    </div>
  );
};

export default IndexPage;