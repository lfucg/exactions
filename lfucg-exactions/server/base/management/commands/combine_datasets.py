import pandas as pd
import numpy as np

def combine():
  df_hist = pd.read_csv('lot_data.csv')

  df_new = pd.read_csv('oct_2018.csv')
  df_new.insert(0, 'New', 'New')
  df_non_repeat = df_new[~df_new['AddressID'].isin(df_hist['AddressID'])]

  df_combined = pd.concat([df_hist, df_non_repeat], sort=False)
  print('COMBINED', df_combined[:10])

  date_fields = ['D_DatePaid', 'P_DatePaid']
  new_dates = []

  for field in date_fields:
    df_new[field] = np.where(df_new[field].empty, 0, df_new[field])
    field_match = df_new[field].str.match('^2018\-')
    for k, v in field_match.iteritems():
      if v == True:
        new_dates.append(k)

  for dat in new_dates:
    print('TRUE K BIGGER', df_new['AddressID'][int(dat)])

  writer = pd.ExcelWriter('Combined Data.xlsx')
  df_combined.to_excel(writer, 'Total Data')

  writer.save()

# For use in shell_plus
# from base.management.commands.combine_datasets import combine

# PLAT DATES
# ['SignedDate'] ['EntryDate-1'] ['EntryDate-2'] ['EntryDate-3'] ['EntryDate-4'] ['EntryDate-5'] ['Resolution-1'] ['Resolution-2'] ['Resolution-3'] ['Resolution-4'] ['Resolution-5']
# LOT DATES
# ['D_DatePaid'] ['P_DatePaid'] ['EntryDate-1'] ['EntryDate-2'] ['EntryDate-3']


# def get_undefined_ledgers():
#   df = pd.read_csv('lot_data.csv')
#   print('Read CSV', df[:10])

#   lacking_resolutions_df = df[(((df['D_SewerCredits'] != 0) | (df['D_OtherCredits'] != 0) | (df['P_SewerCredits'] != 0) | (df['P_OtherCredits'] != 0)) & ((df['AccountLedgerAgreement-1'].isnull()) & (df['AccountLedgerAgreementType-1'] != 'MEMO')))]

#   writer = pd.ExcelWriter('Lots with agreement concerns.xlsx')
#   lacking_resolutions_df.to_excel(writer, 'Lack Resolution Numbers')

#   multiple_resolutions_df = df[(((df['AccountLedgerAgreement-1'].notnull()) | (df['AccountLedgerAgreementType-1'].notnull())) & ((df['AccountLedgerAgreement-2'].notnull()) | (df['AccountLedgerAgreementType-2'].notnull())))]
#   multiple_resolutions_df.to_excel(writer, 'Multiple Resolutions')

#   writer.save()
