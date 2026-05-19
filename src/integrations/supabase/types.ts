export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      accounts: {
        Row: {
          account_no: string
          account_type: string
          created_at: string
          id: string
          level: number | null
          name: string
          nature: string
          notes: string | null
          parent_no: string | null
        }
        Insert: {
          account_no: string
          account_type: string
          created_at?: string
          id?: string
          level?: number | null
          name: string
          nature: string
          notes?: string | null
          parent_no?: string | null
        }
        Update: {
          account_no?: string
          account_type?: string
          created_at?: string
          id?: string
          level?: number | null
          name?: string
          nature?: string
          notes?: string | null
          parent_no?: string | null
        }
        Relationships: []
      }
      areas: {
        Row: {
          created_at: string
          id: string
          name: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
        }
        Relationships: []
      }
      bank_movements: {
        Row: {
          bank_account: string | null
          created_at: string
          deposit: number | null
          description: string | null
          id: string
          movement_date: string
          notes: string | null
          operation_type: string | null
          project_id: string | null
          ref_no: string | null
          withdrawal: number | null
        }
        Insert: {
          bank_account?: string | null
          created_at?: string
          deposit?: number | null
          description?: string | null
          id?: string
          movement_date?: string
          notes?: string | null
          operation_type?: string | null
          project_id?: string | null
          ref_no?: string | null
          withdrawal?: number | null
        }
        Update: {
          bank_account?: string | null
          created_at?: string
          deposit?: number | null
          description?: string | null
          id?: string
          movement_date?: string
          notes?: string | null
          operation_type?: string | null
          project_id?: string | null
          ref_no?: string | null
          withdrawal?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "bank_movements_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      beneficiaries: {
        Row: {
          activity_type: string | null
          area: string | null
          code: string | null
          created_at: string
          guarantor1_name: string | null
          guarantor1_phone: string | null
          guarantor2_name: string | null
          guarantor2_phone: string | null
          id: string
          name: string
          national_id: string | null
          notes: string | null
          phone: string | null
          updated_at: string
          value_chain: string | null
          village: string | null
        }
        Insert: {
          activity_type?: string | null
          area?: string | null
          code?: string | null
          created_at?: string
          guarantor1_name?: string | null
          guarantor1_phone?: string | null
          guarantor2_name?: string | null
          guarantor2_phone?: string | null
          id?: string
          name: string
          national_id?: string | null
          notes?: string | null
          phone?: string | null
          updated_at?: string
          value_chain?: string | null
          village?: string | null
        }
        Update: {
          activity_type?: string | null
          area?: string | null
          code?: string | null
          created_at?: string
          guarantor1_name?: string | null
          guarantor1_phone?: string | null
          guarantor2_name?: string | null
          guarantor2_phone?: string | null
          id?: string
          name?: string
          national_id?: string | null
          notes?: string | null
          phone?: string | null
          updated_at?: string
          value_chain?: string | null
          village?: string | null
        }
        Relationships: []
      }
      cash_movements: {
        Row: {
          amount_in: number | null
          amount_out: number | null
          area: string | null
          beneficiary_id: string | null
          counter_account: string | null
          created_at: string
          description: string | null
          id: string
          movement_date: string
          notes: string | null
          operation_type: string | null
          project_id: string | null
          voucher_no: string | null
        }
        Insert: {
          amount_in?: number | null
          amount_out?: number | null
          area?: string | null
          beneficiary_id?: string | null
          counter_account?: string | null
          created_at?: string
          description?: string | null
          id?: string
          movement_date?: string
          notes?: string | null
          operation_type?: string | null
          project_id?: string | null
          voucher_no?: string | null
        }
        Update: {
          amount_in?: number | null
          amount_out?: number | null
          area?: string | null
          beneficiary_id?: string | null
          counter_account?: string | null
          created_at?: string
          description?: string | null
          id?: string
          movement_date?: string
          notes?: string | null
          operation_type?: string | null
          project_id?: string | null
          voucher_no?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "cash_movements_beneficiary_id_fkey"
            columns: ["beneficiary_id"]
            isOneToOne: false
            referencedRelation: "beneficiaries"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cash_movements_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      installments: {
        Row: {
          amount: number
          created_at: string
          due_date: string
          id: string
          installment_no: number
          loan_id: string | null
          notes: string | null
          paid: number | null
          pay_date: string | null
          receipt_no: string | null
          remaining: number | null
          status: string | null
        }
        Insert: {
          amount?: number
          created_at?: string
          due_date: string
          id?: string
          installment_no: number
          loan_id?: string | null
          notes?: string | null
          paid?: number | null
          pay_date?: string | null
          receipt_no?: string | null
          remaining?: number | null
          status?: string | null
        }
        Update: {
          amount?: number
          created_at?: string
          due_date?: string
          id?: string
          installment_no?: number
          loan_id?: string | null
          notes?: string | null
          paid?: number | null
          pay_date?: string | null
          receipt_no?: string | null
          remaining?: number | null
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "installments_loan_id_fkey"
            columns: ["loan_id"]
            isOneToOne: false
            referencedRelation: "loans"
            referencedColumns: ["id"]
          },
        ]
      }
      journal_entries: {
        Row: {
          account_no: string | null
          area: string | null
          beneficiary_id: string | null
          created_at: string
          credit: number | null
          debit: number | null
          description: string | null
          document_no: string | null
          document_type: string | null
          entry_date: string
          entry_no: string | null
          id: string
          notes: string | null
          project_id: string | null
        }
        Insert: {
          account_no?: string | null
          area?: string | null
          beneficiary_id?: string | null
          created_at?: string
          credit?: number | null
          debit?: number | null
          description?: string | null
          document_no?: string | null
          document_type?: string | null
          entry_date?: string
          entry_no?: string | null
          id?: string
          notes?: string | null
          project_id?: string | null
        }
        Update: {
          account_no?: string | null
          area?: string | null
          beneficiary_id?: string | null
          created_at?: string
          credit?: number | null
          debit?: number | null
          description?: string | null
          document_no?: string | null
          document_type?: string | null
          entry_date?: string
          entry_no?: string | null
          id?: string
          notes?: string | null
          project_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "journal_entries_beneficiary_id_fkey"
            columns: ["beneficiary_id"]
            isOneToOne: false
            referencedRelation: "beneficiaries"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "journal_entries_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      loans: {
        Row: {
          amount: number
          beneficiary_id: string | null
          created_at: string
          delivery_date: string | null
          first_installment_date: string | null
          id: string
          installment_amount: number | null
          installments_count: number | null
          loan_no: string | null
          loan_type: string | null
          notes: string | null
          remaining: number | null
          status: string | null
          total_paid: number | null
        }
        Insert: {
          amount?: number
          beneficiary_id?: string | null
          created_at?: string
          delivery_date?: string | null
          first_installment_date?: string | null
          id?: string
          installment_amount?: number | null
          installments_count?: number | null
          loan_no?: string | null
          loan_type?: string | null
          notes?: string | null
          remaining?: number | null
          status?: string | null
          total_paid?: number | null
        }
        Update: {
          amount?: number
          beneficiary_id?: string | null
          created_at?: string
          delivery_date?: string | null
          first_installment_date?: string | null
          id?: string
          installment_amount?: number | null
          installments_count?: number | null
          loan_no?: string | null
          loan_type?: string | null
          notes?: string | null
          remaining?: number | null
          status?: string | null
          total_paid?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "loans_beneficiary_id_fkey"
            columns: ["beneficiary_id"]
            isOneToOne: false
            referencedRelation: "beneficiaries"
            referencedColumns: ["id"]
          },
        ]
      }
      memberships: {
        Row: {
          area: string | null
          created_at: string
          id: string
          join_date: string | null
          member_name: string
          member_no: string | null
          notes: string | null
          phone: string | null
          share_value: number | null
          shares_count: number | null
          status: string | null
          total_value: number | null
        }
        Insert: {
          area?: string | null
          created_at?: string
          id?: string
          join_date?: string | null
          member_name: string
          member_no?: string | null
          notes?: string | null
          phone?: string | null
          share_value?: number | null
          shares_count?: number | null
          status?: string | null
          total_value?: number | null
        }
        Update: {
          area?: string | null
          created_at?: string
          id?: string
          join_date?: string | null
          member_name?: string
          member_no?: string | null
          notes?: string | null
          phone?: string | null
          share_value?: number | null
          shares_count?: number | null
          status?: string | null
          total_value?: number | null
        }
        Relationships: []
      }
      projects: {
        Row: {
          code: string | null
          created_at: string
          end_date: string | null
          funder: string | null
          funding_type: string | null
          id: string
          name: string
          notes: string | null
          start_date: string | null
          status: string | null
          total_amount: number | null
        }
        Insert: {
          code?: string | null
          created_at?: string
          end_date?: string | null
          funder?: string | null
          funding_type?: string | null
          id?: string
          name: string
          notes?: string | null
          start_date?: string | null
          status?: string | null
          total_amount?: number | null
        }
        Update: {
          code?: string | null
          created_at?: string
          end_date?: string | null
          funder?: string | null
          funding_type?: string | null
          id?: string
          name?: string
          notes?: string | null
          start_date?: string | null
          status?: string | null
          total_amount?: number | null
        }
        Relationships: []
      }
      units: {
        Row: {
          created_at: string
          description: string | null
          id: string
          manager_name: string | null
          name: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          manager_name?: string | null
          name: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          manager_name?: string | null
          name?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
