"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  CreditCard,
  Download,
  Eye,
  Filter,
  TrendingUp,
  Wallet,
  ArrowUpRight,
  ArrowDownLeft,
  CheckCircle,
  Clock,
  XCircle,
} from "lucide-react"
import { motion } from "framer-motion"
import { useIsMobile } from "@/hooks/use-mobile"
import { useToast } from "@/components/ui/use-toast"

export default function PaymentsPage() {
  const isMobile = useIsMobile()
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("overview")

  const transactions = [
    {
      id: "TXN001",
      type: "payment",
      description: "Tractor rental - Mahindra 575",
      amount: -3200,
      date: "2025-06-04",
      status: "completed",
      method: "UPI",
      recipient: "Suresh Kumar",
      bookingId: "BK001",
    },
    {
      id: "TXN002",
      type: "earning",
      description: "Water pump rental income",
      amount: 1800,
      date: "2025-06-03",
      status: "completed",
      method: "Bank Transfer",
      payer: "Amit Sharma",
      bookingId: "BK002",
    },
    {
      id: "TXN003",
      type: "payment",
      description: "Harvester rental - New Holland",
      amount: -2500,
      date: "2025-06-02",
      status: "pending",
      method: "Card",
      recipient: "Lakshmi Devi",
      bookingId: "BK003",
    },
    {
      id: "TXN004",
      type: "refund",
      description: "Cancelled booking refund",
      amount: 1200,
      date: "2025-06-01",
      status: "completed",
      method: "UPI",
      bookingId: "BK004",
    },
    {
      id: "TXN005",
      type: "earning",
      description: "Rotavator rental income",
      amount: 3500,
      date: "2025-05-30",
      status: "completed",
      method: "Cash",
      payer: "Priya Patel",
      bookingId: "BK005",
    },
  ]

  const paymentMethods = [
    {
      id: 1,
      type: "UPI",
      identifier: "farmer@paytm",
      isDefault: true,
      icon: "📱",
    },
    {
      id: 2,
      type: "Bank Account",
      identifier: "****1234",
      isDefault: false,
      icon: "🏦",
    },
    {
      id: 3,
      type: "Credit Card",
      identifier: "****5678",
      isDefault: false,
      icon: "💳",
    },
  ]

  const stats = [
    {
      title: "Total Balance",
      value: "₹12,450",
      change: "+₹2,300",
      changeType: "positive",
      icon: Wallet,
      description: "Available for withdrawal",
    },
    {
      title: "This Month Spent",
      value: "₹8,700",
      change: "+15%",
      changeType: "neutral",
      icon: ArrowUpRight,
      description: "Equipment rentals",
    },
    {
      title: "This Month Earned",
      value: "₹5,300",
      change: "+22%",
      changeType: "positive",
      icon: ArrowDownLeft,
      description: "Equipment lending",
    },
    {
      title: "Pending Payments",
      value: "₹2,500",
      change: "1 transaction",
      changeType: "neutral",
      icon: Clock,
      description: "Awaiting processing",
    },
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-600" />
      case "failed":
        return <XCircle className="h-4 w-4 text-red-600" />
      default:
        return <CheckCircle className="h-4 w-4 text-green-600" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-700"
      case "pending":
        return "bg-yellow-100 text-yellow-700"
      case "failed":
        return "bg-red-100 text-red-700"
      default:
        return "bg-green-100 text-green-700"
    }
  }

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case "payment":
        return <ArrowUpRight className="h-4 w-4 text-red-600" />
      case "earning":
        return <ArrowDownLeft className="h-4 w-4 text-green-600" />
      case "refund":
        return <ArrowDownLeft className="h-4 w-4 text-blue-600" />
      default:
        return <ArrowUpRight className="h-4 w-4 text-gray-600" />
    }
  }

  const handleDownloadReceipt = (transactionId: string) => {
    toast({
      title: "📄 Downloading Receipt",
      description: `Receipt for transaction ${transactionId} is being downloaded.`,
    })
  }

  const handleWithdraw = () => {
    toast({
      title: "💰 Withdrawal Initiated",
      description: "Your withdrawal request has been submitted for processing.",
    })
  }

  return (
    <div className={`space-y-6 ${isMobile ? "p-4" : ""}`}>
      {/* Header */}
      <motion.div
        className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight">💳 Payments</h2>
          <p className="text-muted-foreground">Manage your transactions and payment methods</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Button className="bg-green-600 hover:bg-green-700" onClick={handleWithdraw}>
            <Wallet className="mr-2 h-4 w-4" />
            Withdraw
          </Button>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <stat.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="flex items-center justify-between">
                  <p className="text-xs text-muted-foreground">{stat.description}</p>
                  <span
                    className={`text-xs font-medium ${
                      stat.changeType === "positive"
                        ? "text-green-600"
                        : stat.changeType === "negative"
                          ? "text-red-600"
                          : "text-gray-600"
                    }`}
                  >
                    {stat.change}
                  </span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Transactions</TabsTrigger>
          <TabsTrigger value="methods">Payment Methods</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">📊 Recent Transactions</CardTitle>
              <CardDescription>Your latest payment activity</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {transactions.map((transaction, index) => (
                  <motion.div
                    key={transaction.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                        {getTransactionIcon(transaction.type)}
                      </div>
                      <div>
                        <h4 className="font-medium">{transaction.description}</h4>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span>{transaction.date}</span>
                          <span>•</span>
                          <span>{transaction.method}</span>
                          {(transaction.recipient || transaction.payer) && (
                            <>
                              <span>•</span>
                              <span>{transaction.recipient || transaction.payer}</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div
                        className={`text-lg font-semibold ${
                          transaction.amount > 0 ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {transaction.amount > 0 ? "+" : ""}₹{Math.abs(transaction.amount).toLocaleString()}
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={getStatusColor(transaction.status)}>
                          {getStatusIcon(transaction.status)}
                          <span className="ml-1 capitalize">{transaction.status}</span>
                        </Badge>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6"
                          onClick={() => handleDownloadReceipt(transaction.id)}
                        >
                          <Download className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="methods" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">💳 Payment Methods</CardTitle>
              <CardDescription>Manage your payment and withdrawal methods</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {paymentMethods.map((method, index) => (
                  <motion.div
                    key={method.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-xl">
                        {method.icon}
                      </div>
                      <div>
                        <h4 className="font-medium">{method.type}</h4>
                        <p className="text-sm text-muted-foreground">{method.identifier}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {method.isDefault && <Badge className="bg-green-100 text-green-700">Default</Badge>}
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-2" />
                        View
                      </Button>
                    </div>
                  </motion.div>
                ))}
                <Button variant="outline" className="w-full">
                  <CreditCard className="h-4 w-4 mr-2" />
                  Add New Payment Method
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">📈 Spending Trends</CardTitle>
                <CardDescription>Your monthly spending pattern</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { month: "June 2025", amount: 8700, change: "+15%" },
                    { month: "May 2025", amount: 7500, change: "+8%" },
                    { month: "April 2025", amount: 6900, change: "-5%" },
                    { month: "March 2025", amount: 7300, change: "+12%" },
                  ].map((data, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-sm font-medium">{data.month}</span>
                      <div className="text-right">
                        <span className="font-semibold">₹{data.amount.toLocaleString()}</span>
                        <span className="text-xs text-green-600 ml-2">{data.change}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">💰 Earnings Trends</CardTitle>
                <CardDescription>Your monthly earnings from equipment lending</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { month: "June 2025", amount: 5300, change: "+22%" },
                    { month: "May 2025", amount: 4300, change: "+18%" },
                    { month: "April 2025", amount: 3600, change: "+10%" },
                    { month: "March 2025", amount: 3200, change: "+5%" },
                  ].map((data, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-sm font-medium">{data.month}</span>
                      <div className="text-right">
                        <span className="font-semibold">₹{data.amount.toLocaleString()}</span>
                        <span className="text-xs text-green-600 ml-2">{data.change}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Quick Actions for Mobile */}
      {isMobile && (
        <motion.div
          className="grid grid-cols-2 gap-4 pb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Button className="h-16 bg-green-600 hover:bg-green-700 flex-col gap-1" onClick={handleWithdraw}>
            <Wallet className="h-5 w-5" />
            <span className="text-sm">Withdraw</span>
          </Button>
          <Button variant="outline" className="h-16 flex-col gap-1">
            <TrendingUp className="h-5 w-5" />
            <span className="text-sm">View Report</span>
          </Button>
        </motion.div>
      )}
    </div>
  )
}
