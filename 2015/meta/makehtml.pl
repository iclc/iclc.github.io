#!/usr/bin/perl -w

use strict;
my @ids;
foreach my $fn (@ARGV) {
    my ($id) = $fn =~ /(\d+)/
	or die;
    print("$id $fn\n");
    system("cat head.html $fn foot.html > $id.html");
    push(@ids, $id);
}

open(FH, ">index.html") 
    or die;

print(FH "<html><head><title>ICLC metadata index</title></head><body><ul>\n");
foreach my $id (@ids) {
    print(FH "<li><a href=\"$id.html\">$id</a></li>");
}
print(FH "</ul></body></html>\n");
close(FH);
