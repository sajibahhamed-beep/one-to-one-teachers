"use client";

import {
  Database,
  EyeOff,
  ShieldCheck,
  CreditCard,
  FileText,
  BookOpen,
  CheckCircle,
  CheckCircle2,
  Clock,
  PhoneCall,
  HelpCircle,
  RefreshCw,
  Lock,
  Scale,
  Info,
  Shield,
  Award,
  Sparkles,
  User,
  GraduationCap,
} from "lucide-react";

interface PageSectionIconProps {
  name?: string;
  className?: string;
}

export default function PageSectionIcon({ name, className = "w-6 h-6 flex-shrink-0" }: PageSectionIconProps) {
  switch (name?.toLowerCase()) {
    case "database":
      return <Database className={className} />;
    case "eyeoff":
    case "eye-off":
      return <EyeOff className={className} />;
    case "shieldcheck":
    case "shield-check":
      return <ShieldCheck className={className} />;
    case "creditcard":
    case "credit-card":
      return <CreditCard className={className} />;
    case "filetext":
    case "file-text":
      return <FileText className={className} />;
    case "bookopen":
    case "book-open":
      return <BookOpen className={className} />;
    case "checkcircle":
    case "check-circle":
      return <CheckCircle className={className} />;
    case "checkcircle2":
    case "check-circle-2":
      return <CheckCircle2 className={className} />;
    case "clock":
      return <Clock className={className} />;
    case "phonecall":
    case "phone-call":
    case "phone":
      return <PhoneCall className={className} />;
    case "helpcircle":
    case "help-circle":
      return <HelpCircle className={className} />;
    case "refreshcw":
    case "refresh-cw":
    case "refresh":
      return <RefreshCw className={className} />;
    case "lock":
      return <Lock className={className} />;
    case "scale":
      return <Scale className={className} />;
    case "info":
      return <Info className={className} />;
    case "award":
      return <Award className={className} />;
    case "sparkles":
      return <Sparkles className={className} />;
    case "user":
      return <User className={className} />;
    case "graduationcap":
    case "graduation-cap":
      return <GraduationCap className={className} />;
    default:
      return <ShieldCheck className={className} />;
  }
}
